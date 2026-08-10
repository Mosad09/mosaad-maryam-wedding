import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";
import { MusicProvider } from "./context/MusicContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
