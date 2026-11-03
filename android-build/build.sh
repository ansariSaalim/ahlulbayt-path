#!/usr/bin/env bash
set -euo pipefail
cd app/android
chmod +x gradlew
./gradlew assembleRelease --no-daemon --stacktrace
cd ../..
mkdir -p out
cp app/android/app/build/outputs/apk/release/app-release.apk out/ahlulbayt-path.apk
ls -la out
