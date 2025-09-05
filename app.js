// Placeholders replaced by GitHub Actions before deploy
const clientId = "__CLIENT_ID__";
const redirectUri = "__REDIRECT_URI__";

function loginWithGitHub() {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  window.location.href = githubAuthUrl;
}

function logout() {
  // Clear token
  localStorage.removeItem("gitos_token");

  // Show login screen again
  document.getElementById("desktop").style.display = "none";
  document.getElementById("login-screen").style.display = "block";
}

// Parse query params
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  // Save token for later use
  localStorage.setItem("gitos_token", token);

  // 🔑 Remove ?token=... from URL
  window.history.replaceState({}, document.title, window.location.pathname);

  showDesktop(token);
} else {
  // If token already in localStorage, auto-login
  const savedToken = localStorage.getItem("gitos_token");
  if (savedToken) {
    showDesktop(savedToken);
  }
}

function showDesktop(token) {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("desktop").style.display = "block";

  // Fetch user profile from GitHub
  fetch("https://api.github.com/user", {
    headers: { Authorization: `token ${token}` }
  })
    .then(res => res.json())
    .then(user => {
      document.getElementById("welcome").innerText = `Hello, ${user.login}!`;
    })
    .catch(() => {
      document.getElementById("welcome").innerText = "Welcome!";
    });
}
