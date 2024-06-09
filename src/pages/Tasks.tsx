import { Link } from "react-router-dom";
import { TaskList } from "../components/task/TaskList";
import { VscDiffAdded } from "react-icons/vsc";

const Tasks: React.FC = () => {
  return (
    <div className="flex flex-col w-fulls items-start justify-between gap-6">
      <div className="flex items-start justify-between w-2/3">
        <h1 className="text-3xl font-semibold text-gray-800 underline underline-offset-4">
          Tasks
        </h1>
      </div>
      <Link
        className="group relative inline-block focus:outline-none focus:ring mb-10"
        to="/task/create"
      >
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

        <span className="relative inline-flex items-center border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
          Add Task <VscDiffAdded className="ml-1 size-6" />
        </span>
      </Link>
      <TaskList />
    </div>
  );
};

export default Tasks;
