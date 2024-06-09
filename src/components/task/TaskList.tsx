import React from "react";
import { useTaskManager } from "../../contexts/TaskManager";
import Task from "./Task";
import PageNotFound from "../../pages/errors/PageNotFound";

export const TaskList: React.FC = () => {
  const { tasks, fetchTasks } = useTaskManager();

  React.useEffect;
  React.useEffect(() => {
    async function init() {
      await fetchTasks();
    }
    init();
  }, []);

  return (
    <div className="w-full h-full">
      {tasks.current.items?.length ? (
        <ol className="flex flex-wrap gap-4">
          {tasks.current.items.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </ol>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};
