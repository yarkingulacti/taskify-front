import React from "react";
import { Link } from "react-router-dom";
import { TaskList } from "../components/task/task-list";
import { VscDiffAdded } from "react-icons/vsc";

const Tasks: React.FC = () => {
  return (
    <React.Fragment>
      <div id="breadcrumb" className="flex items-start justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 underline underline-offset-4">
          Dashboard {">"} Tasks
        </h1>
      </div>
      <div className="flex flex-col w-fulls items-start justify-between">
        <div className="w-full flex items-center rounded-lg bg-yellow-100 p-5 shadow-sm">
          <Link
            className="group relative inline-block focus:outline-none focus:ring"
            to="/task/create"
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative inline-flex items-center border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              Add Task <VscDiffAdded className="ml-1 size-6" />
            </span>
          </Link>
        </div>
        <div className="w-full py-4 overflow-y-auto">
          <TaskList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
