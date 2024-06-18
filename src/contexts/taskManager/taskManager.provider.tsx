import React from "react";
import axios from "axios";
import { Icons, toast } from "react-toastify";
import TaskManagerContext from "./taskManager.context";
import { TaskCreateModel, TaskModel } from "../../models/task.model";
import { PaginationResponse } from "../../components/pagination/types";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

export const TaskManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [tasks, setTasks] = React.useState<PaginationResponse<TaskModel>>({
    items: [],
    meta: {
      currentPage: 0,
      totalPages: 0,
      currentPageSize: 0,
      totalItemsCount: 0,
    },
  });

  async function fetchTasks() {
    setIsFetching(true);

    await axios<PaginationResponse<TaskModel>>({
      method: "GET",
      url: "/task/list",
      params: {
        take: pageSize,
        skip: (currentPage - 1) * pageSize,
      },
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
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  async function createTask(data: TaskCreateModel) {
    return axios<TaskModel>({
      method: "POST",
      url: "/task",
      data,
    })
      .then(() => {
        toast("Task created successfully", {
          icon: Icons.success,
          closeOnClick: false,
          autoClose: 2500,
          type: "success",
        });

        return fetchTasks();
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

  async function reFetch() {
    if (!isFetching) await fetchTasks();
  }

  React.useEffect(() => {
    reFetch();
  }, [currentPage]);

  return (
    <TaskManagerContext.Provider
      value={{ tasks, reFetch, createTask, setCurrentPage, setPageSize }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
