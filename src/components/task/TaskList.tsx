import React from "react";
import Task from "./Task";
import { TaskModel } from "../../schema/database";
import { useTaskManager } from "../../contexts/TaskManager";

export const TaskList: React.FC = () => {
  const [list, setList] = React.useState<TaskModel[]>([]);

  const { tasks } = useTaskManager();

  React.useEffect(() => {
    setList(tasks);
  });

  return (
    <div className="w-full">
      {list.length ? (
        <ol className="flex flex-wrap gap-4">
          {list.map((task) => (
            <Task key={task.id} data={task} />
          ))}
        </ol>
      ) : (
        <p>No tasks found!</p>
      )}
    </div>
  );
};
