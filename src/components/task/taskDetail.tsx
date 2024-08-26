import React from "react";
import { useTaskManager } from "../../contexts/taskManager/taskManager.context";
import { ApiHelper } from "../helpers/api.helper";
import { useLocation } from "react-router-dom";
import { TaskStatus } from "../../models/task.model";
import classNames from "classnames";
import { TfiCheckBox, TfiLightBulb, TfiTimer } from "react-icons/tfi";
import moment from "moment";

const apiHelper = new ApiHelper();
export const TaskDetail = () => {
  const tooltipRef = React.useRef<HTMLSpanElement>(null);
  const tooltipContentRef = React.useRef<HTMLSpanElement>(null);
  const location = useLocation();
  const { selectedTask, setSelectedTask } = useTaskManager();

  React.useEffect(() => {
    if (location.state?.id)
      apiHelper.taskDetail(location.state.id).then((res) => {
        if (res) setSelectedTask(res.data);
      });

    return () => {
      console.log("removing event listeners");

      setSelectedTask(null);
      if (tooltipRef.current) {
        tooltipRef.current.removeEventListener("mouseenter", tooltipIn);
        tooltipRef.current.removeEventListener("mouseleave", tooltipOut);
      }
    };
  }, []);

  React.useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.addEventListener("mouseenter", tooltipIn);
      tooltipRef.current.addEventListener("mouseleave", tooltipOut);
    }
  }, [selectedTask?.id]);

  function tooltipIn() {
    if (tooltipRef.current && tooltipContentRef.current) {
      tooltipContentRef.current.classList.toggle("hidden");
      tooltipContentRef.current.classList.toggle("flex");
      setTimeout(() => {
        if (tooltipContentRef.current) {
          tooltipContentRef.current.classList.toggle("opacity-0");
        }
      }, 100);
    }
  }

  function tooltipOut() {
    if (tooltipRef.current && tooltipContentRef.current) {
      tooltipContentRef.current.classList.toggle("opacity-0");
      setTimeout(() => {
        if (tooltipContentRef.current) {
          tooltipContentRef.current.classList.toggle("hidden");
          tooltipContentRef.current.classList.toggle("flex");
        }
      }, 100);
    }
  }

  return selectedTask ? (
    <React.Fragment>
      <div className="mx-1 mt-4 flex items-start justify-center">
        <div className="w-full p-6">
          <div className="mb-3">
            <h1 className="relative text-6xl font-bold inline-block">
              <span>{selectedTask.title}</span>
              <span
                ref={tooltipRef}
                className="bg-slate-200 p-3 rounded-full absolute -right-10 -top-11 bg-opacity-15 shadow-md transition-all ease-linear hover:bg-slate-50 hover:shadow-lg duration-100 cursor-help"
              >
                <span
                  ref={tooltipContentRef}
                  className="transition-all duration-100 ease-in-out opacity-0 absolute left-full w-40 text-center translate-x-3 bottom-1/2 translate-y-1/2 text-sm z-50 px-3 py-1 bg-teal-500 text-white rounded-lg hidden flex-col items-start"
                >
                  <span className="text-center w-full font-light">
                    {selectedTask.status !== TaskStatus.COMPLETED
                      ? "Last Action time"
                      : "Completion time"}
                  </span>
                  <span className="bg-white block w-full h-0.5"></span>
                  <span className="font-semibold">
                    {moment(selectedTask.updated_at).format("DD/MM/YYYY-HH:mm")}
                  </span>
                </span>
                {selectedTask.status === TaskStatus.PENDING ? (
                  <TfiTimer className="text-yellow-300 size-8 font-semibold" />
                ) : null}
                {selectedTask.status === TaskStatus.IN_PROGRESS ? (
                  <TfiLightBulb className="text-blue-300 size-8 font-semibold" />
                ) : null}
                {selectedTask.status === TaskStatus.COMPLETED ? (
                  <TfiCheckBox className="text-green-300 size-8 font-semibold" />
                ) : null}
              </span>
              <span
                className={classNames(
                  "absolute left-0 bottom-0 w-7/12 h-4 opacity-30",
                  {
                    "bg-yellow-300": selectedTask.status === TaskStatus.PENDING,
                    "bg-blue-300":
                      selectedTask.status === TaskStatus.IN_PROGRESS,
                    "bg-green-300":
                      selectedTask.status === TaskStatus.COMPLETED,
                  }
                )}
              ></span>
            </h1>
          </div>
          <span className="bg-black block w-2/12 h-0.5 mb-6"></span>
          <div
            dangerouslySetInnerHTML={{ __html: selectedTask.description }}
            className="text-3xl font-semibold"
          ></div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};
