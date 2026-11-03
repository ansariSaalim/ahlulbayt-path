// Adds permissions, the notification icon, signing and version numbers to the generated Android project.
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const APP = path.join(ROOT, "app");
const run = process.env.RUN_NUMBER || "1";
// 1. load Capacitor's runtime before our scripts
const idx = path.join(APP, "www", "index.html");
let html = fs.readFileSync(idx, "utf8");
html = html.replace('<script src="js/data.js', '<script src="capacitor.js"></script>\n<script src="js/data.js');
fs.writeFileSync(idx, html);
// 2. permissions
const man = path.join(APP, "android/app/src/main/AndroidManifest.xml");
let m = fs.readFileSync(man, "utf8");
const perms = ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION", "POST_NOTIFICATIONS", "SCHEDULE_EXACT_ALARM", "RECEIVE_BOOT_COMPLETED", "VIBRATE", "WAKE_LOCK"]
  .filter(p => !m.includes("android.permission." + p))
  .map(p => '    <uses-permission android:name="android.permission.' + p + '" />').join("\n");
m = m.replace(/(\s*)<\/manifest>/, "\n" + perms + "\n</manifest>");
fs.writeFileSync(man, m);
// 3. small notification icon
const dr = path.join(APP, "android/app/src/main/res/drawable");
fs.mkdirSync(dr, { recursive: true });
fs.copyFileSync(path.join(ROOT, "android-build/ic_stat_notify.xml"), path.join(dr, "ic_stat_notify.xml"));
// 4. signing + version
const gp = path.join(APP, "android/app/build.gradle");
let g = fs.readFileSync(gp, "utf8");
g = g.replace(/versionCode \d+/, "versionCode " + run).replace(/versionName "[^"]*"/, 'versionName "1.' + run + '"');
g = g.replace(/buildTypes \{/, `signingConfigs {
        release {
            storeFile file("${ROOT}/android-build/ahlulbayt.jks")
            storePassword "of0UN5MBUDVJok0l3rFypRNu"
            keyAlias "ahlulbayt"
            keyPassword "of0UN5MBUDVJok0l3rFypRNu"
        }
    }
    buildTypes {`);
g = g.replace(/release \{\s*\n(\s*)minifyEnabled false/, (s, sp) => "release {\n" + sp + "signingConfig signingConfigs.release\n" + sp + "minifyEnabled false");
fs.writeFileSync(gp, g);
console.log("Patched. versionCode", run);
console.log(g.match(/signingConfig signingConfigs.release/) ? "signing ok" : "WARNING: signing not set");
