import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";

import "./assets/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { TaskManagementProvider } from "./providers/TaskManagementProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    ,
    <TaskManagementProvider>
      <ToastContainer />
      <App />
    </TaskManagementProvider>
  </React.StrictMode>
);
