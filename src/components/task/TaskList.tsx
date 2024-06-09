import React from "react";
import { useTaskManager } from "../../contexts/TaskManager";
import Task from "./Task";
import PageNotFound from "../../pages/errors/PageNotFound";

export const TaskList: React.FC = () => {
  const { tasks } = useTaskManager();

  return (
    <div className="w-full h-full">
      {tasks.items?.length ? (
        <ol className="flex flex-wrap gap-4">
          {tasks.items.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </ol>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};
