import React from "react";
import { TaskCreateModel, TaskModel } from "../../models/task-model";
import { PaginationResponse } from "../../components/pagination/type";

interface TaskManagerInterface {
  tasks: PaginationResponse<TaskModel>;
  reFetch: () => Promise<void>;
  setPageSize: (size: number) => void;
  createTask: (task: TaskCreateModel) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setSelectedTask: (task: TaskModel | null) => void;
  selectedTask: TaskModel | null;
}

const TaskManagerContext = React.createContext<
  TaskManagerInterface | undefined
>(undefined);

export const useTaskManager = () => {
  const context = React.useContext(TaskManagerContext);
  if (context === undefined) {
    throw new Error("useTaskManager must be used within a TaskManagerProvider");
  }
  return context;
};

export default TaskManagerContext;
