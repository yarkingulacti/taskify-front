import React from "react";
import { VscChevronDown } from "react-icons/vsc";
import { TaskDetail as Detail } from "../components/task/taskDetail";
import { useTaskManager } from "../contexts/taskManager/taskManager.context";

const TaskDetail: React.FC = () => {
  const statusDropdownRef = React.useRef<HTMLDivElement>(null);

  const { selectedTask } = useTaskManager();

  function toggleStatusDropdown(e?: React.MouseEvent<HTMLButtonElement>) {
    e?.stopPropagation();

    if (statusDropdownRef.current) {
      statusDropdownRef.current.classList.toggle("hidden");
      statusDropdownRef.current.classList.toggle("flex");
      setTimeout(() => {
        if (statusDropdownRef.current) {
          statusDropdownRef.current.classList.toggle("opacity-0");
        }
      }, 100);
    }
  }

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      e.stopPropagation();
      if (
        statusDropdownRef.current &&
        statusDropdownRef.current.classList.contains("flex")
      )
        toggleStatusDropdown();
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <React.Fragment>
      <div id="breadcrumb" className="flex items-start justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 underline underline-offset-4">
          Tasks {">"} Task Detail {">"} {selectedTask?.title}
        </h1>
      </div>
      <div className="flex flex-col w-fulls items-start justify-between">
        <div className="w-full flex items-center rounded-lg bg-yellow-100 p-5 shadow-sm">
          <button
            onClick={toggleStatusDropdown}
            type="button"
            className="group relative inline-block w-fit focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative inline-flex items-center border-2 border-current px-4 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              Update Status <VscChevronDown className="ml-1 size-6" />
            </span>
            <div
              ref={statusDropdownRef}
              className="absolute border-black transition-all ease-in-out duration-100 hidden opacity-0 flex-col items-start py-2 font-semibold z-10 w-full mt-2 origin-top-right bg-white border-2 shadow-xl"
            >
              <span className="w-full mb-2 border-b-2 border-teal-400">
                Pending
              </span>
              <span className="w-full mb-2 border-b-2 border-teal-400">
                In Progress
              </span>
              <span className="w-full">Completed</span>
            </div>
          </button>
        </div>
        <div className="w-full py-4 overflow-y-auto">
          <Detail />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaskDetail;
