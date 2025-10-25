import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";

// Ensure the loading screen is removed when the app loads
const removeLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('loaded');
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.remove();
      }
    }, 500);
  }
};

// Remove loading screen immediately when main.tsx loads
removeLoadingScreen();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
