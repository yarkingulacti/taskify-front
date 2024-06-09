import { createContext, useContext } from "react";
import { TaskCreateModel, TaskModel } from "../models/Task.model";

interface TaskManagerInterface {
  tasks: TaskModel[];
  createTask: (task: TaskCreateModel, callback?: () => void) => void;
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
