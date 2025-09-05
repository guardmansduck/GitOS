// app.js

// Grab settings from config.js
const clientId = CONFIG.CLIENT_ID;
const redirectUri = CONFIG.REDIRECT_URI;

// DOM elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const statusBox = document.getElementById("status");

// GitOS backend API (hosted on Vercel or wherever your backend is)
const backendAuthUrl = "https://your-backend.vercel.app/api/auth";

// --- Login flow ---
function login() {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read:user`;
  window.location.href = authUrl;
}

// --- Logout flow ---
function logout() {
  localStorage.removeItem("access_token");
  statusBox.innerText = "Logged out.";
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
}

// --- Handle redirect from GitHub ---
async function handleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      statusBox.innerText = "Exchanging code for token…";

      const res = await fetch(`${backendAuthUrl}?code=${code}`);
      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        statusBox.innerText = "✅ Logged in!";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";

        // Clean up the URL (remove ?code=…)
        window.history.replaceState({}, document.title, redirectUri);
      } else {
        statusBox.innerText = "❌ Failed to log in.";
      }
    } catch (err) {
      console.error("Auth error:", err);
      statusBox.innerText = "❌ Error during login.";
    }
  } else {
    // Auto-login if already have token
    const token = localStorage.getItem("access_token");
    if (token) {
      statusBox.innerText = "✅ Already logged in.";
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      statusBox.innerText = "Not logged in.";
    }
  }
}

// --- Wire up buttons ---
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);

// --- Run on page load ---
handleRedirect();
