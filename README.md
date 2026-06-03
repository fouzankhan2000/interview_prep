# Frontend Interview Prep Checklist

A personal checklist app to track your SDE-2 interview preparation. Progress is saved to Firebase Firestore and syncs across all your devices.

---

## Setup

### 1. Create a Firebase project

1. Go to [firebase.google.com](https://firebase.google.com) and click **Get Started**
2. Create a new project (any name, e.g. `prep-checklist`)
3. Skip Google Analytics if asked

### 2. Set up Firestore

1. In the Firebase Console sidebar, click **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (fine for personal use)
4. Pick any region and click **Enable**

### 3. Get your Firebase config

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll down to **Your apps** → click the `</>` Web icon
3. Register the app (any nickname)
4. Copy the `firebaseConfig` object values

### 4. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual values from step 3.

### 5. Run locally

```bash
npm install
npm run dev
```

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. In Vercel project settings → **Environment Variables**, add all 6 `VITE_FIREBASE_*` variables
4. Deploy — done!

> **Important:** Add the environment variables in Vercel's dashboard, not just in `.env.local`. Vercel doesn't read your local `.env.local` file.

---

## Notes

- Progress is saved to Firestore under `progress/default_user`
- If you want multi-user support later, integrate Firebase Auth and replace `default_user` with `user.uid`
- The free Firebase Spark plan is more than enough for personal use
