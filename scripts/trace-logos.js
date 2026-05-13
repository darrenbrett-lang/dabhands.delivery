// One-off: trace brand PNGs to SVG.
//
// Auto-detects whether the silhouette lives in the alpha channel
// (white-on-transparent) or in the RGB channels (light/white-ish on white),
// and preprocesses accordingly so potrace gets a clean black-on-white input.
//
// Run with: node scripts/trace-logos.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const potrace = require('potrace');

const LOGOS_DIR = path.join(__dirname, '..', 'public', 'images', 'logos');

function trace(buffer, opts) {
  return new Promise((resolve, reject) => {
    potrace.trace(buffer, opts, (err, svg) => (err ? reject(err) : resolve(svg)));
  });
}

async function preprocess(pngPath) {
  const stats = await sharp(pngPath).stats();
  const alpha = stats.channels[3];
  const alphaRange = alpha ? alpha.max - alpha.min : 0;
  const useAlpha = alphaRange > 200;

  let buf;
  if (useAlpha) {
    // Alpha-channel silhouette
    buf = await sharp(pngPath)
      .extractChannel('alpha')
      .blur(0.6)
      .threshold(128)
      .negate({ alpha: false })
      .toBuffer();
  } else {
    // RGB-encoded silhouette.
    // First try treating the LOGO as the brightest pixels (pure-white-on-anything
    // case, like hugo-boss with checkerboard "transparency"). Threshold 254 keeps
    // only near-pure-white. If the result is mostly white (logo isn't brightest —
    // e.g. unilever subtle near-white logo on white bg), fall back to the
    // standard "logo darker than bg" threshold at 248.
    const trial = await sharp(pngPath)
      .flatten({ background: '#ffffff' })
      .greyscale()
      .blur(0.6)
      .threshold(254)
      .toBuffer();
    const trialStats = await sharp(trial).stats();
    const trialMean = trialStats.channels[0].mean;
    if (trialMean < 220) {
      // Logo IS the bright minority. Use this trial result, negate to get
      // black-on-white for potrace.
      buf = await sharp(trial).negate({ alpha: false }).toBuffer();
    } else {
      // Logo is darker than bg. Standard threshold.
      buf = await sharp(pngPath)
        .flatten({ background: '#ffffff' })
        .greyscale()
        .blur(0.6)
        .threshold(248)
        .toBuffer();
    }
  }

  // After binarization, the LOGO should be the minority class (BLACK pixels)
  // and the BACKGROUND should be the majority (WHITE pixels). If the result
  // is inverted (e.g. white logo on a checkerboard "background" baked into RGB,
  // like hugo-boss), most pixels will be BLACK after threshold — invert again
  // so potrace traces the logo, not the background.
  const binStats = await sharp(buf).stats();
  const meanLuma = binStats.channels[0].mean;
  if (meanLuma < 128) {
    buf = await sharp(buf).negate({ alpha: false }).toBuffer();
  }

  // Trim white border to the bounding box of the actual logo content.
  // This gives every output SVG a viewBox tight to the logo itself, so
  // when rendered at a fixed height (in the ticker) they all appear at
  // equal visual height regardless of source PNG padding.
  try {
    buf = await sharp(buf).trim({ background: '#ffffff', threshold: 10 }).toBuffer();
  } catch (e) {
    // If trim fails (e.g. image is entirely one colour), keep the un-trimmed buffer.
  }

  return buf;
}

(async () => {
  const files = fs
    .readdirSync(LOGOS_DIR)
    .filter((f) => /\.png$/i.test(f))
    .filter((f) => !f.startsWith('.'));

  console.log(`Found ${files.length} PNG logos in ${LOGOS_DIR}\n`);

  for (const f of files) {
    const pngPath = path.join(LOGOS_DIR, f);
    const svgPath = path.join(LOGOS_DIR, f.replace(/\.png$/i, '.svg'));

    try {
      const stats = await sharp(pngPath).stats();
      const useAlpha = stats.channels[3] && stats.channels[3].max - stats.channels[3].min > 200;
      const mode = useAlpha ? 'alpha' : 'rgb';

      const prepped = await preprocess(pngPath);

      // turdSize scales with image area so noise of similar visual size
      // is filtered consistently across small + large source PNGs.
      const meta = await sharp(pngPath).metadata();
      const area = meta.width * meta.height;
      const turdSize = Math.max(20, Math.round(area / 8000));

      const svg = await trace(prepped, {
        threshold: 128,
        turdSize,
        optTolerance: 0.5,
        alphaMax: 1.0,
        color: '#000000',
      });

      fs.writeFileSync(svgPath, svg);
      const inSize = fs.statSync(pngPath).size;
      const outSize = fs.statSync(svgPath).size;
      const pct = Math.round((outSize / inSize) * 100);
      console.log(
        `  ✓ ${f.padEnd(28)} [${mode}]  ${(inSize / 1024).toFixed(1).padStart(7)}KB  →  ${(outSize / 1024)
          .toFixed(1)
          .padStart(7)}KB  (${pct}%)`,
      );
    } catch (e) {
      console.error(`  ✗ ${f}: ${e.message}`);
    }
  }
})();
