import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";

import "./assets/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { TaskManagementProvider } from "./contexts/task-manager/provider.tsx";
import { RouterHistoryManagerProvider } from "./contexts/history-manager/provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskManagementProvider>
    <RouterHistoryManagerProvider>
      <ToastContainer />
      <App />
    </RouterHistoryManagerProvider>
  </TaskManagementProvider>
);
