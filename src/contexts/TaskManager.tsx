import { createContext, useContext } from "react";
import { TaskCreateModel, TaskModel } from "../models/Task.model";
import { PaginationResponse } from "../components/common/pagination/types";

interface TaskManagerInterface {
  tasks: PaginationResponse<TaskModel>;
  setCurrentPage: (page: number) => void;
  createTask: (task: TaskCreateModel, callback?: () => void) => Promise<void>;
}

const TaskManager = createContext<TaskManagerInterface | undefined>(undefined);

export const useTaskManager = () => {
  const context = useContext(TaskManager);
  if (context === undefined) {
    throw new Error("useTaskManager must be used within a TaskManagerProvider");
  }
  return context;
};

export default TaskManager;
