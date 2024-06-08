import React from "react";
import { openDB, IDBPDatabase } from "idb";
import { Icons, toast } from "react-toastify";
import TaskManager from "../contexts/TaskManager";
import { Taskify, TaskModel } from "../schema/database";

export const TaskManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [tasks, setTasks] = React.useState<TaskModel[]>([]);

  let db: IDBPDatabase<Taskify> | null = null;

  async function initDB() {
    db = await openDB<Taskify>("taskify", 1, {
      upgrade(db) {
        const taskStore = db.createObjectStore("tasks", {
          keyPath: "id",
          autoIncrement: true,
        });
        taskStore.createIndex("pk_tasks", "id", {
          unique: true,
        });
      },
    });

    if (db) console.log(`🚀 Database initialized successfully!`);
    else console.error(`🚨 Error initializing database!`);
  }

  function fetchTasks() {
    if (db) {
      return db
        .getAll("tasks")
        .then((tasks) => {
          setTasks(tasks);
        })
        .catch((error) => {
          toast(`🚨 Error fetching tasks: ${error}`, {
            icon: Icons.error,
            closeOnClick: false,
            autoClose: 2500,
            type: "error",
          });
        });
    }
  }

  function createTask(newTask: TaskModel) {
    if (db)
      db.add("tasks", newTask)
        .then((newId) => {
          toast(`🚀 Task #${newId} added successfully!`, {
            icon: Icons.success,
            closeOnClick: true,
            autoClose: 2000,
            type: "success",
          });

          return;
        })
        .catch((error) => {
          toast(`🚨 Error adding task: ${error}`, {
            icon: Icons.error,
            closeOnClick: false,
            autoClose: 2500,
            type: "error",
          });
        })
        .finally(() => {
          fetchTasks();
        });
    else console.error(`🚨 Database not available!`);
  }

  React.useEffect(() => {
    async function init() {
      await initDB();
      await fetchTasks();
    }

    init();

    return () => {
      if (db) {
        db.close();
        console.info(`🚀 Database closed successfully!`);
      }
    };
  }, []);

  return (
    <TaskManager.Provider value={{ tasks, createTask }}>
      {children}
    </TaskManager.Provider>
  );
};
