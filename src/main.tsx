// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { PlayProvider } from "./context/PlayContext"; // <- make sure this path is correct
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PlayProvider>
      <App />
    </PlayProvider>
  </React.StrictMode>
);
