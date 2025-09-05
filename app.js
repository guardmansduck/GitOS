const clientId = "Ov23li3Fit4bt8BOD31D"; // same value as GITOS_CLIENT_ID
const redirectUri = "https://gitos-backend.vercel.app/api/auth";

function loginWithGitOS() {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;
}
