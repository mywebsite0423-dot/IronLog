# IronLog setup (Firebase + GitHub + Cloudflare Pages)

## 1. Firebase (free Spark plan)
1. console.firebase.google.com → Add project (skip Analytics).
2. Build → Firestore Database → Create database (production mode, any region near you).
3. Firestore → Rules → paste the contents of `firestore.rules` → Publish.
4. Build → Authentication → Get started → Sign-in method → enable **Email/Password** and, if you want it, **Google**.
5. Project settings (gear) → Your apps → Web app (`</>`) → register → copy the `firebaseConfig` values.
6. Open `index.html`, find `PASTE YOUR FIREBASE WEB CONFIG HERE`, and replace the placeholder values. (This config is not a secret; the rules protect your data.)

## 2. GitHub
Create a repo and push everything in this folder (index.html, sw.js, manifest.webmanifest, icons).

## 3. Cloudflare Pages
Workers & Pages → Create → Pages → Connect to Git → pick the repo. Framework preset: None. Build command: leave empty. Build output directory: `/` (or `.`). Deploy.

## 4. Allow your site to sign in
Firebase → Authentication → Settings → Authorized domains → Add your `xxxx.pages.dev` domain (and any custom domain).

## 5. Phone
Open the Pages address, sign in (Create account the first time), then Share → Add to Home Screen (iOS) or menu → Add to Home screen (Android).

Notes
- Your existing phone data uploads automatically the first time you sign in on that device.
- To make it yours alone: create your account, copy your UID from Authentication → Users, and in `firestore.rules` replace `request.auth.uid == uid` with `request.auth.uid == uid && request.auth.uid == "YOUR_UID"`, then publish the rules.
- After each deploy, bump the version number in `sw.js` so phones pick up the update.
