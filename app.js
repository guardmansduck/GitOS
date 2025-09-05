// app.js
document.getElementById("login-btn").addEventListener("click", () => {
  const clientId = CONFIG.CLIENT_ID;
  const redirectUri = CONFIG.REDIRECT_URI;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;

  window.location.href = authUrl;
});

// After redirect back from GitHub
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (code) {
  fetch(`${CONFIG.BACKEND_URL}/auth?code=${code}`)
    .then(res => res.json())
    .then(data => {
      // Hide login button
      document.getElementById("login-btn").style.display = "none";

      // Show user info
      const userInfo = document.getElementById("user-info");
      userInfo.style.display = "block";

      // Replace avatar placeholder with actual GitHub avatar
      const avatar = document.getElementById("avatar");
      avatar.src = data.avatar_url || getResourcePath("avatarPlaceholder");

      // Set username
      document.getElementById("username").textContent = data.login;
    })
    .catch(err => console.error("Auth failed", err));
}
