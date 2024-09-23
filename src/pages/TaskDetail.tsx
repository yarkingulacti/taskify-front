import React from "react";
import { VscChevronDown } from "react-icons/vsc";
import { TaskDetail as Detail } from "../components/task/task-detail";
import classNames from "classnames";
import { useTaskManager } from "../contexts/taskManager/taskManager.context";
import { useLoaderStore } from "../stores/loaders.store";
import { ApiHelper } from "../components/helpers/api.helper";
import { TaskStatus } from "../models/task.model";

const apiHelper = new ApiHelper();
const TaskDetail: React.FC = () => {
  const statusDropdownRef = React.useRef<HTMLDivElement>(null);

  const { pageLoading, pageLoaded } = useLoaderStore();
  const { selectedTask, setSelectedTask } = useTaskManager();

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

  async function updateStatus(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    status: TaskStatus
  ) {
    e.stopPropagation();

    if (selectedTask?.status === status) return;
    else if (selectedTask) {
      pageLoading();

      await apiHelper
        .updateTaskStatus(selectedTask?.id as string, status)
        .then((res) => {
          if (res) {
            setSelectedTask(res.data);
            toggleStatusDropdown();
          }
        })
        .finally(() => {
          setTimeout(() => {
            pageLoaded();
          }, 500);
        });
    }
  }

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
              className="absolute border-black transition-all ease-in-out duration-100 hidden opacity-0 flex-col items-start font-semibold z-10 w-full bg-white border-2 shadow-xl rounded-lg mt-0.5"
            >
              <span
                onClick={(e) => updateStatus(e, TaskStatus.PENDING)}
                className={classNames(
                  "w-full py-1 border-b-2 border-black rounded-lg",
                  {
                    "bg-teal-400 text-white cursor-not-allowed italic":
                      selectedTask?.status === TaskStatus.PENDING
                  }
                )}
              >
                Pending
              </span>
              <span
                onClick={(e) => updateStatus(e, TaskStatus.IN_PROGRESS)}
                className={classNames(
                  "w-full py-1 border-b-2 border-black rounded-lg",
                  {
                    "bg-teal-400 text-white cursor-not-allowed":
                      selectedTask?.status === TaskStatus.IN_PROGRESS
                  }
                )}
              >
                In Progress
              </span>
              <span
                onClick={(e) => updateStatus(e, TaskStatus.COMPLETED)}
                className={classNames("w-full py-1 rounded-lg", {
                  "bg-teal-400 text-white cursor-not-allowed":
                    selectedTask?.status === TaskStatus.COMPLETED
                })}
              >
                Completed
              </span>
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
