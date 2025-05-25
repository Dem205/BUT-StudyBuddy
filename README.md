# 📘 Study Buddy Matcher

**Study Buddy Matcher** is a lightweight web app that helps university students find ideal study partners based on shared courses, interests, study times — and contact them instantly via WhatsApp.

Built using **Vanilla JavaScript**, **Firebase Authentication**, and **Cloud Firestore**.

---

## 🚀 Features

- ✅ User signup/login with Firebase Authentication
- 🧑‍🎓 Profile creation: name, courses, interests, study time, WhatsApp
- 🤝 View Top 5 best-matched students
- 💬 WhatsApp links for instant messaging
- 🔐 Forgot password support
- 💅 Clean UI with responsive design

---

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Firebase Authentication
- Firestore (NoSQL database)
- WhatsApp Web API

---

## 🧩 Folder Structure
    study-buddy-matcher/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

    
---

## ✏️ Profile Form Fields

| Field       | Description                                   |
|-------------|-----------------------------------------------|
| `name`      | User's full name                              |
| `courses`   | Comma-separated list (e.g. `CSC101, MTH201`)  |
| `interests` | Comma-separated interests (e.g. `AI, Web Dev`)|
| `studyTime` | Morning, Afternoon, or Night                  |
| `whatsapp`  | Full number with country code (e.g. `+234...`)|

---

## 🔐 Authentication Flow

1. Users sign up or log in using email/password
2. Firebase handles session management securely
3. Users must complete a profile before matching

---

## 🤖 Matching Logic

Matches are scored by:
- ✅ +1 for each shared course
- ✅ +1 for same study time
- ✅ +1 for each shared interest

Only the **Top 5 Matches** are displayed.

---

## 💬 Contacting Matches

Each match card includes:
- Name as a **WhatsApp link**
- Shared info (courses, interests, time)
- Match score

Clicking the name opens WhatsApp with a message:
> _"Hey! I found you on Study Buddy Matcher — want to study together?"_

---

## 🧪 How to Test Locally

1. Clone or download the repo
2. Set up your Firebase project
3. Add your Firebase config to `script.js` in the `firebaseConfig` section
4. Open `index.html` in your browser
5. Create multiple accounts, complete profiles, and try matching!

---

## 🧼 Resetting Test Data (Optional)

To wipe test accounts:
- **Firestore**: Delete all documents in the `users` collection
- **Authentication**: Delete users from Firebase Auth

> Note: Deleting users in bulk requires Firebase Admin SDK (for production use)

---

🙌 Author
Made with ❤️ by Demi
Powered by Firebase
