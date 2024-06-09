import React from "react";
import { TaskCreateModel, TaskModel } from "../models/Task.model";
import { PaginationResponse } from "../components/common/pagination/types";

interface TaskManagerInterface {
  tasks: PaginationResponse<TaskModel>;
  reFetch: () => Promise<void>;
  setPageSize: (size: number) => void;
  createTask: (task: TaskCreateModel) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const TaskManager = React.createContext<TaskManagerInterface | undefined>(
  undefined
);

export const useTaskManager = () => {
  const context = React.useContext(TaskManager);
  if (context === undefined) {
    throw new Error("useTaskManager must be used within a TaskManagerProvider");
  }
  return context;
};

export default TaskManager;
