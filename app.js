// Listen for login button click
document.getElementById("login-btn").addEventListener("click", () => {
  // Show loading spinner
  document.getElementById("loading-overlay").style.display = "flex";

  const clientId = CONFIG.CLIENT_ID;        // from config.js
  const redirectUri = CONFIG.REDIRECT_URI;  // from config.js

  // GitHub OAuth URL
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;

  // Redirect user to GitHub login
  window.location.href = authUrl;
});

// Handle GitHub redirect back with ?code=...
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

// Show overlay while waiting for backend
if (code) {
  document.getElementById("loading-overlay").style.display = "flex";

  fetch(`${CONFIG.BACKEND_URL}/auth?code=${code}`)
    .then(res => res.json())
    .then(data => {
      // Hide login button
      document.getElementById("login-btn").style.display = "none";

      // Show user info
      const userInfo = document.getElementById("user-info");
      userInfo.style.display = "block";

      // Replace avatar with GitHub avatar if available
      const avatar = document.getElementById("avatar");
      avatar.src = data.avatar_url || getResourcePath("avatarPlaceholder");

      // Show username
      document.getElementById("username").textContent = data.login;

      // Hide loading spinner
      document.getElementById("loading-overlay").style.display = "none";
    })
    .catch(err => {
      console.error("Auth failed", err);

      // Hide overlay if something goes wrong
      document.getElementById("loading-overlay").style.display = "none";
      alert("Login failed. Please try again.");
    });
}
