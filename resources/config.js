// resources/config.js
// Centralized list of all resource files
// Update ONLY this file to swap images/icons

const RESOURCES = {
  // Branding
  logo: "s.png",
  background: "background.jpg",

  // Auth
  githubIcon: "github-icon.png",

  // User
  avatarPlaceholder: "avatar.png",

  // Optional extras (you can add/remove as needed)
  wallpaper: "wallpaper.jpg",
  favicon: "favicon.ico",
  loadingSpinner: "spinner.gif"
};

// Helper: returns full path to a resource
function getResourcePath(key) {
  if (!RESOURCES[key]) {
    console.warn(`Resource "${key}" not found in config.js`);
    return "";
  }
  return `resources/${RESOURCES[key]}`;
}
