import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// 🛠️ Firebase config – replace with your actual values
 const firebaseConfig = {
    apiKey: "AIzaSyCoUDZKFJltnhLXbNUfi33ItW8iZh0k9Io",
    authDomain: "but-studybuddy.firebaseapp.com",
    projectId: "but-studybuddy",
    storageBucket: "but-studybuddy.firebasestorage.app",
    messagingSenderId: "56293341519",
    appId: "1:56293341519:web:989f56c7d270da0db7ed3a",
    measurementId: "G-KVP71GT2CH"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;

// 🧑‍💻 Auth Handlers
document.getElementById("signup-btn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful!");
  } catch (err) {
    alert("Signup error: " + err.message);
  }
};

document.getElementById("login-btn").onclick = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (err) {
    alert("Login error: " + err.message);
  }
};

// 🔁 Login Status Change
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("profile-section").style.display = "block";
  }
});


// 📥 Save Profile


document.getElementById("profile-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return alert("Please log in first.");

const profile = {
  uid: currentUser.uid,
  name: document.getElementById("name").value.trim(),
  courses: document.getElementById("courses").value.toLowerCase().split(",").map(c => c.trim()),
  studyTime: document.getElementById("study-time").value,
  interests: document.getElementById("interests").value.toLowerCase().split(",").map(i => i.trim()),
  whatsapp: document.getElementById("whatsapp").value.trim()
};

  try {
    await addDoc(collection(db, "users"), profile);
    alert("Profile saved!");
  } catch (err) {
    console.error("Error saving profile:", err);
  }
});

// 🧠 Matchmaking
document.getElementById("find-matches").onclick = async () => {
  if (!currentUser) return alert("Please log in first.");

  const matchesDiv = document.getElementById("matches");
  matchesDiv.innerHTML = "<h2>Top Matches</h2>"; // ✅ Clears old content

  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];
  let myProfile = null;

  querySnapshot.forEach(docSnap => {
    const user = docSnap.data();
    if (user.uid === currentUser.uid) {
      myProfile = user;
    } else {
      users.push(user);
    }
  });

  if (!myProfile) {
    alert("Your profile is missing. Please fill it again.");
    return;
  }

  // Use a Set to track displayed UIDs and prevent duplication
  const displayedUIDs = new Set();

  const matches = users.map(user => {
    let score = 0;
    user.courses?.forEach(c => {
      if (myProfile.courses.includes(c)) score++;
    });
    if (user.studyTime === myProfile.studyTime) score++;
    user.interests?.forEach(i => {
      if (myProfile.interests.includes(i)) score++;
    });
    return { user, score };
  }).sort((a, b) => b.score - a.score);

  if (matches.length === 0) {
    matchesDiv.innerHTML += "<p>No matches found.</p>";
    return;
  }

  matches.forEach(({ user, score }) => {
    if (displayedUIDs.has(user.uid)) return; // ✅ Prevent duplicates
    displayedUIDs.add(user.uid);

    const div = document.createElement("div");
    div.className = "match-card";
    div.innerHTML = `
  <strong><a href="https://wa.me/234${user.whatsapp}?text=Hey!%20I%20found%20you%20on%20Study%20Buddy%20Matcher%20—%20want%20to%20study%20together?" target="_blank" style="color:#4f46e5;text-decoration:underline;">
    ${user.name}
  </a></strong>
  <span><b>Courses:</b> ${user.courses.filter(c => myProfile.courses.includes(c)).join(", ") || "None"}</span>
  <span><b>Interests:</b> ${user.interests.filter(i => myProfile.interests.includes(i)).join(", ") || "None"}</span>
  <span><b>Study Time:</b> ${user.studyTime}</span>
  <span><b>Match Score:</b> ${score}</span>
`;

    matchesDiv.appendChild(div);
  });
};


import { signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out!");
    // Reset UI
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("profile-section").style.display = "none";
    document.getElementById("matches").innerHTML = "";
  } catch (err) {
    console.error("Logout error:", err);
    alert("Error logging out.");
  }
});

import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

document.getElementById("profile-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return alert("Please log in first.");

  const profile = {
    uid: currentUser.uid,
    name: document.getElementById("name").value.trim(),
    courses: document.getElementById("courses").value.toLowerCase().split(",").map(c => c.trim()),
    studyTime: document.getElementById("study-time").value,
    interests: document.getElementById("interests").value.toLowerCase().split(",").map(i => i.trim())
  };

  try {
    await setDoc(doc(db, "users", currentUser.uid), profile);
    alert("Profile saved!");
  } catch (err) {
    console.error("Error saving profile:", err);
    alert("Could not save profile.");
  }
});
