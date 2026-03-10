import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

async function enableMSW() {
  const shouldEnable =
    import.meta.env.DEV || String(import.meta.env.VITE_ENABLE_MSW || "").toLowerCase() === "true";

  if (!shouldEnable) return;

  const { worker } = await import("./mocks/browser.js");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

enableMSW().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});