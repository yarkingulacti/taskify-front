import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MasterLayout } from "./components/layout/MasterLayout";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/errors/PageNotFound";
import { CreateTask } from "./components/task/CreateTask";
import { Tasks } from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route path="dashboard" key="dashboard" element={<Home />} />
          <Route path="tasks" key="tasks" element={<Tasks />} />
          <Route path="task/create" key="taskCreate" element={<CreateTask />} />
          <Route path="task/:id" key="taskDetail" element={<CreateTask />} />
          <Route path="task/:id/edit" key="taskEdit" element={<CreateTask />} />
          <Route
            path="task/:id/delete"
            key="taskDelete"
            element={<CreateTask />}
          />
          <Route path="history" key="history" element={<Home />} />
          <Route path="calendar" key="calendar" element={<Home />} />
          <Route path="*" key="pageNotFound" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
