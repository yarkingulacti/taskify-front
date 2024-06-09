import React from "react";
import { useTaskManager } from "../../contexts/TaskManager";
import Task from "./Task";
import { TaskModel } from "../../models/Task.model";
import { PaginationResponse } from "../common/pagination/types";

export const TaskList: React.FC = () => {
  const [list, setList] = React.useState<PaginationResponse<TaskModel>>({
    items: [],
    meta: {
      currentPage: 0,
      totalPages: 0,
      currentPageSize: 0,
      totalItemsCount: 0,
    },
  });

  const { tasks } = useTaskManager();

  React.useEffect(() => {
    setList(tasks);
  }, []);

  return (
    <div className="w-full h-full">
      {list.items.length ? (
        <ol className="flex flex-wrap gap-4">
          {list.items.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </ol>
      ) : (
        <p>No tasks found!</p>
      )}
    </div>
  );
};
