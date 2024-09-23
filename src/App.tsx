import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MasterLayout } from "./components/layout/master";
import { FullscreenLoader } from "./components/helpers/fullscreen-loader";
import { Suspense, lazy } from "react";
import TaskDetail from "./pages/task-detail";

// Lazy load components
const Home = lazy(() => import("./pages"));
const PageNotFound = lazy(
  () => import("./components/layout/error/page-not-found")
);
const CreateTask = lazy(() => import("./components/task/task-create"));
const Tasks = lazy(() => import("./pages/task-list"));
const TaskCalendar = lazy(() => import("./pages/calendar"));
const Board = lazy(() => import("./pages/board"));

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
            <Route path="task/:id" key="taskDetail" element={<TaskDetail />} />
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
            <Route path="board" key="board" element={<Board />} />
            <Route path="*" key="pageNotFound" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
