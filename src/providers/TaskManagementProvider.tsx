import React from "react";
import axios from "axios";
import { Icons, toast } from "react-toastify";
import TaskManager from "../contexts/TaskManager";
import { TaskModel } from "../models/Task.model";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

export const TaskManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [tasks, setTasks] = React.useState<TaskModel[]>([]);

  async function fetchTasks() {
    await axios({
      method: "GET",
      url: "/task/list",
    })
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((error) => {
        toast(`${error}`, {
          icon: Icons.error,
          closeOnClick: false,
          autoClose: 2500,
          type: "error",
        });
      });
  }

  async function createTask(data: TaskModel, callback?: () => void) {
    await axios({
      method: "POST",
      url: "/task",
      data,
    })
      .then(({ data }) => {
        setTasks([...tasks, data]);
        toast("Task created successfully", {
          icon: Icons.success,
          closeOnClick: false,
          autoClose: 2500,
          type: "success",
        });

        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        if (error.response) {
          toast(
            `${[...(error.response.data.message?.message ?? [])].join(",")}`,
            {
              icon: Icons.error,
              closeOnClick: false,
              autoClose: 2500,
              type: "error",
            }
          );
        } else {
          toast(`${error.message}`, {
            icon: Icons.error,
            closeOnClick: false,
            autoClose: 2500,
            type: "error",
          });
        }
      });
  }

  React.useEffect(() => {
    async function init() {
      await fetchTasks();
    }
    init();
  }, []);

  return (
    <TaskManager.Provider value={{ tasks, createTask }}>
      {children}
    </TaskManager.Provider>
  );
};
