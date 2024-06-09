import React from "react";
import _ from "lodash";
import axios from "axios";
import { Icons, toast } from "react-toastify";
import TaskManager from "../contexts/TaskManager";
import { TaskCreateModel, TaskModel } from "../models/Task.model";
import useStore from "../stores/store";
import { PaginationResponse } from "../components/common/pagination/types";

axios.defaults.baseURL = import.meta.env.VITE_API_URL as string;

export const TaskManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isFetching = React.useRef(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [tasks, setTasks] = React.useState<PaginationResponse<TaskModel>>({
    items: [],
    meta: {
      currentPage: 0,
      totalPages: 0,
      currentPageSize: 0,
      totalItemsCount: 0,
    },
  });
  const { loading, done } = useStore();

  async function fetchTasks() {
    loading();

    isFetching.current = true;

    await axios<PaginationResponse<TaskModel>>({
      method: "GET",
      url: "/task/list",
      params: {
        take: 10,
        skip: currentPage - 1,
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
        isFetching.current = false;
        _.delay(done, 1000);
      });
  }

  async function createTask(data: TaskCreateModel, callback?: () => void) {
    loading();

    await axios<PaginationResponse<TaskModel>>({
      method: "POST",
      url: "/task",
      data,
    })
      .then(({ data }) => {
        setTasks(data);
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
    <TaskManager.Provider value={{ tasks, createTask, setCurrentPage }}>
      {children}
    </TaskManager.Provider>
  );
};
