import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";

import "./assets/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { TaskManagementProvider } from "./contexts/taskManager/taskManager.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskManagementProvider>
    <ToastContainer />
    <App />
  </TaskManagementProvider>
);
