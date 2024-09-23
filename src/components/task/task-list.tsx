import React from "react";
import { useTaskManager } from "../../contexts/task-manager/context";
import Task from "./task-single";
import { Pagination } from "../pagination/pagination";
import { useLoaderStore } from "../../stores/loader-store";
import DataNotFound from "../layout/error/data-not-found";

export const TaskList: React.FC = () => {
  const [page] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const { tasks } = useTaskManager();
  const { isRestLoading } = useLoaderStore();

  React.useEffect(() => {
    if (tasks.meta) {
      setTotalPages(tasks.meta.totalPages);
    }
  }, [tasks]);

  return tasks.items?.length ? (
    <div
      className="flex flex-col justify-between"
      style={{
        minHeight: "calc(100vh - 18rem)"
      }}
    >
      {isRestLoading ? (
        <h1>Loading</h1>
      ) : (
        <ol className="flex justify-center flex-wrap gap-5 mb-10">
          {tasks.items.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </ol>
      )}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  ) : (
    <DataNotFound />
  );
};
