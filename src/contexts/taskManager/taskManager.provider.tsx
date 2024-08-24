import React from "react";
import TaskManagerContext from "./taskManager.context";
import { useLoaderStore } from "../../stores/loaders.store";
import { ApiHelper } from "../../components/helpers/api.helper";
import { PaginationResponse } from "../../components/pagination/type";
import { TaskCreateModel, TaskModel } from "../../models/task.model";
import { Icons, toast } from "react-toastify";

const apiHelper = new ApiHelper();
export const TaskManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /**
   * for rest calls
   */
  const [isFetching, setIsFetching] = React.useState(false);
  const { restLoading, restLoaded } = useLoaderStore();
  /* ------------------------------------- */

  /**
   * Pagination
   */
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
  /* ------------------------------------- */
  /**
   * Detail
   */
  const [selectedTask, setSelectedTask] = React.useState<TaskModel | null>(
    null
  );
  /* ------------------------------------- */

  async function fetchTasks() {
    setIsFetching(true);
    setTasks((await apiHelper.listTasks(pageSize, currentPage))?.data);

    setIsFetching(false);
  }

  async function createTask(data: TaskCreateModel) {
    restLoading();

    await apiHelper.createTask(data);
    await fetchTasks();
    toast("Task created successfully", {
      icon: Icons.success,
      closeOnClick: false,
      autoClose: 2500,
      type: "success",
    });

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
      value={{
        tasks,
        reFetch,
        createTask,
        setCurrentPage,
        setPageSize,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
};
