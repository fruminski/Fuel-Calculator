import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App/App.js";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a3fdd2b2421a53a9e969902a451b87c1@o4509661925343232.ingest.de.sentry.io/4509661933207632", // use your real DSN
  sendDefaultPii: true, // Optional: collects IPs & browser for better error context
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration() // For session replays (recording of user sessions)
  ],
  tracesSampleRate: 1.0, // Performance tracing, 100% in dev
  tracePropagationTargets: ["localhost", /^https:\/\/your-api\.com/], // Replace with your API if needed

  // Optional: Only record 10% of sessions unless an error occurs
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
