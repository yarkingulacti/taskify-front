import React from "react";
import { useTaskManager } from "../../contexts/TaskManager";
import Task from "./Task";
import PageNotFound from "../../pages/errors/PageNotFound";
import { Pagination } from "../common/pagination/Pagination";

export const TaskList: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const { tasks, setCurrentPage } = useTaskManager();

  React.useEffect(() => {
    console.log(tasks.meta);

    if (tasks.meta) {
      setCurrentPage(tasks.meta.currentPage);
      setTotalPages(tasks.meta.totalPages);
    }
  }, []);

  return (
    <div className="w-full h-full">
      {tasks.items?.length ? (
        <React.Fragment>
          <ol className="flex justify-center flex-wrap gap-5 mb-10">
            {tasks.items.map((task) => (
              <Task key={task.id} data={task} />
            ))}
          </ol>
          <Pagination
            currentPage={page}
            onPageChange={(page) => {
              setPage(page);
              setCurrentPage(page);
            }}
            totalPages={totalPages}
          />
        </React.Fragment>
      ) : (
        <PageNotFound /> //TODO items not found component instead
      )}
    </div>
  );
};
