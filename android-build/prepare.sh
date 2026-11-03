#!/usr/bin/env bash
# Builds the Capacitor Android project around the website files.
set -euo pipefail
ROOT="$(pwd)"
rm -rf app && mkdir app && cd app
npm init -y >/dev/null
npm i --no-audit --no-fund @capacitor/core@6 @capacitor/cli@6 @capacitor/android@6 @capacitor/local-notifications@6 @capacitor/assets@3
echo "core dist:"; ls node_modules/@capacitor/core/dist || true
mkdir www
rsync -a --exclude '.git' --exclude '.github' --exclude 'android-build' --exclude 'app' --exclude 'out' --exclude 'README.md' "$ROOT"/ www/
cp node_modules/@capacitor/core/dist/capacitor.js www/capacitor.js
cp "$ROOT/android-build/capacitor.config.json" .
npx cap add android
cp -r "$ROOT/android-build/assets" assets
npx @capacitor/assets generate --android \
  --iconBackgroundColor '#0b1411' --iconBackgroundColorDark '#0b1411' \
  --splashBackgroundColor '#0b1411' --splashBackgroundColorDark '#0b1411' || echo "Icon generation skipped"
node "$ROOT/android-build/patch.js"
npx cap sync android
