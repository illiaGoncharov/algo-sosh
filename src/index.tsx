import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import App from "./components/app/app";

// Отчеты по веб-производительности
import reportWebVitals from "./reportWebVitals";

const renderApp = () => {
  try {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  } catch (error) {
    console.error("При рендере возникла ошибка:", error);
  }
};

renderApp();
reportWebVitals();
