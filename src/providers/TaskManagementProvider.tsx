import React from "react";
import _ from "lodash";
import axios from "axios";
import { Icons, toast } from "react-toastify";
import TaskManager from "../contexts/TaskManager";
import { TaskCreateModel, TaskModel } from "../models/Task.model";
import useCustomStore from "../stores/store";
import { PaginationResponse } from "../components/common/pagination/types";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

export const TaskManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isFetching = React.useRef(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const tasks = React.useRef<PaginationResponse<TaskModel>>({
    items: [],
    meta: {
      currentPage: 0,
      totalPages: 0,
      currentPageSize: 0,
      totalItemsCount: 0,
    },
  });
  const { loading, done } = useCustomStore();

  async function fetchTasks() {
    loading();

    isFetching.current = true;

    await axios<PaginationResponse<TaskModel>>({
      method: "GET",
      url: "/task/list",
      params: {
        take: pageSize,
        skip: (currentPage - 1) * pageSize,
      },
    })
      .then(({ data }) => {
        tasks.current = data;
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
        isFetching.current = false;
        done();
      });
  }

  async function createTask(data: TaskCreateModel) {
    loading();

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
      })
      .finally(() => _.delay(done, 1000));
  }

  React.useEffect(() => {
    async function init() {
      if (!isFetching.current) await fetchTasks();
    }
    init();
  }, [currentPage]);

  return (
    <TaskManager.Provider
      value={{ tasks, fetchTasks, createTask, setCurrentPage, setPageSize }}
    >
      {children}
    </TaskManager.Provider>
  );
};
