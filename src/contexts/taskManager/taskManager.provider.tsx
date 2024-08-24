import React from "react";
import { Icons, toast } from "react-toastify";
import TaskManagerContext from "./taskManager.context";
import { TaskCreateModel, TaskModel } from "../../models/task.model";
import { PaginationResponse } from "../../components/pagination/type";
import { useLoaderStore } from "../../stores/loaders.store";
import { ApiHelper } from "../../helpers/api.helper";

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

  const apiHelper = new ApiHelper(import.meta.env.VITE_API_URL as string);

  const { restLoading, restLoaded } = useLoaderStore();

  async function fetchTasks() {
    setIsFetching(true);
    // restLoading();

    const { data } = await apiHelper
      .GET<PaginationResponse<TaskModel>>("/task/list", {
        params: {
          take: pageSize,
          skip: (currentPage - 1) * pageSize,
        },
      })
      .catch((error) => {
        toast(`${error}`, {
          icon: Icons.error,
          closeOnClick: false,
          autoClose: 2500,
          type: "error",
        });

        return {
          data: {
            items: [],
            meta: {
              currentPage: 0,
              totalPages: 0,
              currentPageSize: 0,
              totalItemsCount: 0,
            },
          },
        };
      });

    setTasks(data);
    setIsFetching(false);
  }

  async function createTask(data: TaskCreateModel) {
    restLoading();

    await apiHelper
      .POST<TaskModel, TaskCreateModel>("/task", data)
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
    toast("Task created successfully", {
      icon: Icons.success,
      closeOnClick: false,
      autoClose: 2500,
      type: "success",
    });

    await fetchTasks();
    restLoaded();
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
