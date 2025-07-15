import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Só monta o App se estiver em modo de desenvolvimento (standalone)
if (import.meta.env.DEV && document.getElementById("root")) {
	ReactDOM.createRoot(document.getElementById("root")!).render(
	  <React.StrictMode>
		<App />
	  </React.StrictMode>
	);
  }
