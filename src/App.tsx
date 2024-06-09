import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MasterLayout } from "./components/layout/MasterLayout";
import { FullscreenLoader } from "./components/layout/FullscreenLoader";
import { Suspense, lazy } from "react";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/errors/PageNotFound"));
const CreateTask = lazy(() => import("./components/task/CreateTask"));
const Tasks = lazy(() => import("./pages/Tasks"));
const TaskCalendar = lazy(() => import("./pages/Calendar"));

function App() {
  return (
    <BrowserRouter>
      <FullscreenLoader />
      <Suspense fallback={<FullscreenLoader />}>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            <Route path="dashboard" key="dashboard" element={<Home />} />
            <Route path="tasks" key="tasks" element={<Tasks />} />
            <Route
              path="task/create"
              key="taskCreate"
              element={<CreateTask />}
            />
            <Route
              //TODO - Create page, include detail, history
              path="task/:id"
              key="taskDetail"
              element={<Home />}
            />
            <Route
              //TODO - Create page, include task detail, confirmation dialog
              path="task/:id/edit"
              key="taskEdit"
              element={<CreateTask />}
            />{" "}
            <Route
              //TODO - Create page, include confirmation dialog and task detail
              path="task/:id/delete"
              key="taskDelete"
              element={<CreateTask />}
            />
            <Route path="calendar" key="calendar" element={<TaskCalendar />} />
            <Route
              //TODO - Create page, include kanban board, task detail modal that contains task history
              path="backlog"
              key="backlog"
              element={<Home />}
            />
            <Route path="*" key="pageNotFound" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
