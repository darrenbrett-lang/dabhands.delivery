// Prepare a camera master for the web: a compressed H.264 MP4 at an explicit
// bitrate, plus a poster frame, both ready to upload to Blob.
//
//   swift scripts/prepare-film.swift <input> <output-base> [poster-seconds] [mbps]
//
//   swift scripts/prepare-film.swift ~/Desktop/master.mov film/hello 2.5 3
//     → film/hello.mp4  and  film/hello-poster.jpg
//
// ⚠ Feed this the MASTER from the videographer, never a file that has already
// been compressed — re-encoding compressed video throws away quality for
// nothing.
//
// AVAssetWriter rather than AVAssetExportSession: the export presets give no
// bitrate control, which on a 96s 1080p master meant 180MB going to 80MB when
// it should be going to 35MB. A talking head against a plain background is
// about the easiest thing H.264 has to encode, so 3 Mbps at 1080p is generous.
// Audio is re-encoded to 128k AAC, which is transparent for speech.

import AVFoundation
import Foundation
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
  print("""
  usage: swift scripts/prepare-film.swift <input> <output-base> [poster-seconds] [mbps]
         <output-base> has no extension; .mp4 and -poster.jpg are added
         mbps defaults to 3.0 (landscape 1080p). 2.5 is plenty for a vertical cut.
  """)
  exit(1)
}
let input = URL(fileURLWithPath: args[1])
let base = args[2]
let posterAt = args.count > 3 ? Double(args[3]) ?? 1.0 : 1.0
let mbps = args.count > 4 ? Double(args[4]) ?? 3.0 : 3.0

guard FileManager.default.fileExists(atPath: input.path) else { print("✗ no such file: \(input.path)"); exit(1) }
try? FileManager.default.createDirectory(at: URL(fileURLWithPath: base).deletingLastPathComponent(),
                                         withIntermediateDirectories: true)

let asset = AVURLAsset(url: input)
let sem = DispatchSemaphore(value: 0)

Task {
  do {
    let duration = try await asset.load(.duration)
    guard let vTrack = try await asset.loadTracks(withMediaType: .video).first else { print("✗ no video track"); exit(1) }
    let aTrack = try await asset.loadTracks(withMediaType: .audio).first

    let natural = try await vTrack.load(.naturalSize)
    let transform = try await vTrack.load(.preferredTransform)
    let shown = natural.applying(transform)
    let W = abs(shown.width).rounded(), H = abs(shown.height).rounded()
    let inMB = (try! FileManager.default.attributesOfItem(atPath: input.path)[.size] as! NSNumber).doubleValue / 1_048_576
    print(String(format: "in     %.0fx%.0f  %.1fs  %.1f MB  (%.1f Mbps)",
                 W, H, duration.seconds, inMB, inMB*8/duration.seconds))

    let out = URL(fileURLWithPath: base + ".mp4")
    try? FileManager.default.removeItem(at: out)

    let reader = try AVAssetReader(asset: asset)
    let writer = try AVAssetWriter(outputURL: out, fileType: .mp4)

    // ── video ────────────────────────────────────────────────────────────
    let readerV = AVAssetReaderTrackOutput(track: vTrack, outputSettings: [
      kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange,
    ])
    reader.add(readerV)

    let writerV = AVAssetWriterInput(mediaType: .video, outputSettings: [
      AVVideoCodecKey: AVVideoCodecType.h264,
      AVVideoWidthKey: Int(W), AVVideoHeightKey: Int(H),
      AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: Int(mbps * 1_000_000),
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        // A keyframe every 2s: enough for the scrubber to seek accurately
        // without spending bitrate on keyframes nobody needs.
        AVVideoMaxKeyFrameIntervalDurationKey: 2,
        AVVideoAllowFrameReorderingKey: true,
      ],
    ])
    writerV.expectsMediaDataInRealTime = false
    // The master may carry a rotation; bake it in so the file needs no metadata
    // to display the right way up.
    writerV.transform = transform
    writer.add(writerV)

    // ── audio ────────────────────────────────────────────────────────────
    var readerA: AVAssetReaderTrackOutput?
    var writerA: AVAssetWriterInput?
    if let aTrack {
      let rA = AVAssetReaderTrackOutput(track: aTrack, outputSettings: [
        AVFormatIDKey: kAudioFormatLinearPCM,
        AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false,
        AVLinearPCMIsBigEndianKey: false, AVLinearPCMIsNonInterleaved: false,
      ])
      reader.add(rA); readerA = rA
      let wA = AVAssetWriterInput(mediaType: .audio, outputSettings: [
        AVFormatIDKey: kAudioFormatMPEG4AAC,
        AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2,
        AVEncoderBitRateKey: 128_000,
      ])
      wA.expectsMediaDataInRealTime = false
      writer.add(wA); writerA = wA
    }

    // Lets playback begin before the whole file arrives — essential when it is
    // served from object storage rather than a streaming host.
    writer.shouldOptimizeForNetworkUse = true
    writer.startWriting()
    writer.startSession(atSourceTime: .zero)
    reader.startReading()

    let group = DispatchGroup()
    func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderTrackOutput, _ label: String) {
      group.enter()
      input.requestMediaDataWhenReady(on: DispatchQueue(label: label)) {
        while input.isReadyForMoreMediaData {
          guard let buf = output.copyNextSampleBuffer() else { input.markAsFinished(); group.leave(); return }
          input.append(buf)
        }
      }
    }
    pump(writerV, readerV, "v")
    if let writerA, let readerA { pump(writerA, readerA, "a") }
    group.wait()

    writer.finishWriting {}
    while writer.status == .writing { usleep(80_000) }
    guard writer.status == .completed else {
      print("✗ encode failed: \(writer.error?.localizedDescription ?? "unknown")"); exit(1)
    }
    let outMB = (try! FileManager.default.attributesOfItem(atPath: out.path)[.size] as! NSNumber).doubleValue / 1_048_576
    print(String(format: "video  %@  %.1f MB  (%.1f Mbps)  — %.0f%% smaller",
                 out.lastPathComponent, outMB, outMB*8/duration.seconds, (1 - outMB/inMB)*100))

    // ── poster ───────────────────────────────────────────────────────────
    let gen = AVAssetImageGenerator(asset: asset)
    gen.appliesPreferredTrackTransform = true
    gen.requestedTimeToleranceBefore = .zero
    gen.requestedTimeToleranceAfter = .zero
    let t = CMTime(seconds: min(posterAt, max(0, duration.seconds - 0.1)), preferredTimescale: 600)
    let cg = try await gen.image(at: t).image
    let posterURL = URL(fileURLWithPath: base + "-poster.jpg")
    if let dest = CGImageDestinationCreateWithURL(posterURL as CFURL, "public.jpeg" as CFString, 1, nil) {
      CGImageDestinationAddImage(dest, cg, [kCGImageDestinationLossyCompressionQuality: 0.82] as CFDictionary)
      CGImageDestinationFinalize(dest)
      print("poster \(posterURL.lastPathComponent)  at \(String(format: "%.1f", posterAt))s")
    }
    sem.signal()
  } catch { print("✗ \(error)"); exit(1) }
}
sem.wait()
