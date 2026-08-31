#!/usr/bin/env bash
# Upload prepared film files to Vercel Blob.
#
#   scripts/upload-film.sh <file> [<file> …]
#
# Uses npx vercel, so nothing needs installing.
#
# Auth, once: put the store's read-write token in .env.local (gitignored).
# Vercel dashboard → Storage → dabhands-film → Quickstart → the .env.local tab
# shows the line to copy:
#
#   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_…
#
# ⚠ `vercel env pull` will NOT get it for you: Vercel redacts secrets to
# [SENSITIVE] on pull. The OIDC route does not work either — OIDC is enabled
# for production and preview on this project but not for development, which is
# the environment a local pull uses. The dashboard copy is the way in.
#
# Blob was chosen over Cloudflare R2 because R2's custom domains require the
# whole zone to sit on Cloudflare DNS, and dabhands.delivery is on GoDaddy
# carrying Google Workspace MX plus a GoDaddy-managed SPF include. Moving the
# nameservers to host a video would have put email deliverability at risk.
# See HANDOVER for the full record inventory if that move is ever made properly.
#
# Every object goes up public and immutable for a year. That is safe ONLY
# because filenames are versioned: a re-cut means a NEW filename (hello-2.mp4),
# never overwriting hello.mp4, which would leave a year of caches serving the
# old film. Same rule the site's images follow — and note --allow-overwrite is
# deliberately NOT passed, so an accidental overwrite fails loudly instead.
#
# ⚠ --add-random-suffix is NOT passed either. The CLI already defaults to no
# suffix, and passing the flag with a space-separated "false" is read as TRUE,
# which produced film/hello-pwTQxjlNKNsl….mp4 instead of film/hello.mp4.
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: scripts/upload-film.sh <file> [<file> …]"
  echo "   eg: scripts/upload-film.sh film/hello.mp4 film/hello-poster.jpg"
  exit 1
fi

YEAR=31536000

# Take the token from the environment, or from .env.local, so a normal run is
# just: scripts/upload-film.sh <files…>
if [ -z "${BLOB_READ_WRITE_TOKEN:-}" ] && [ -f .env.local ]; then
  BLOB_READ_WRITE_TOKEN="$(grep -m1 '^BLOB_READ_WRITE_TOKEN=' .env.local | cut -d= -f2- | tr -d '"'"'"'' || true)"
  export BLOB_READ_WRITE_TOKEN
fi
if [ -z "${BLOB_READ_WRITE_TOKEN:-}" ] || [ "$BLOB_READ_WRITE_TOKEN" = "[SENSITIVE]" ]; then
  echo "✗ No usable BLOB_READ_WRITE_TOKEN."
  echo "  Copy it from the Vercel dashboard (Storage → dabhands-film →"
  echo "  Quickstart → .env.local tab) and add that line to .env.local."
  exit 1
fi

for f in "$@"; do
  [ -f "$f" ] || { echo "✗ no such file: $f"; exit 1; }
  key="$(basename "$f")"
  case "$key" in
    *.mp4)        type="video/mp4" ;;
    *.webm)       type="video/webm" ;;
    *.jpg|*.jpeg) type="image/jpeg" ;;
    *.webp)       type="image/webp" ;;
    *.vtt)        type="text/vtt" ;;
    *) echo "✗ unknown type for $key"; exit 1 ;;
  esac
  echo "→ $key  ($type)"
  npx --yes vercel blob put "$f" \
    --access public \
    --pathname "film/$key" \
    --content-type "$type" \
    --cache-control-max-age "$YEAR"
done

cat <<'NEXT'

done. Copy the URLs printed above into FILM in pages/intro.tsx:
  src / poster                 the landscape cut
  portraitSrc / portraitPoster the portrait cut
then delete public/film/placeholder*.mp4 and re-time the captions.
NEXT
