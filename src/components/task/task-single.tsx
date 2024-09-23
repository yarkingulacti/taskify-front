import React from "react";
import { TfiTimer, TfiLightBulb, TfiCheckBox, TfiTime } from "react-icons/tfi";
import { BsDot } from "react-icons/bs";
import { TaskModel, TaskStatus } from "../../models/task-model";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Task: React.FC<{
  data: TaskModel;
}> = ({ data }) => {
  return (
    <article
      className={classNames(
        "rounded-xl bg-white shadow-md px-5 py-3 ring transform hover:-translate-y-2 hover:shadow-lg transition-all duration-150 ease-linear",
        {
          "ring-yellow-300": data.status === TaskStatus.PENDING,
          "ring-blue-300": data.status === TaskStatus.IN_PROGRESS,
          "ring-green-300": data.status === TaskStatus.COMPLETED
        },
        {
          "bg-yellow-50": data.status === TaskStatus.PENDING,
          "bg-blue-50": data.status === TaskStatus.IN_PROGRESS,
          "bg-green-50": data.status === TaskStatus.COMPLETED
        }
      )}
    >
      <div className="flex flex-col items-center sm:gap-8">
        <div>
          <div className="flex justify-between items-center gap-2 mt-2">
            <div>
              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <Link
                  to={`/task/${data.id}`}
                  state={{ id: data.id }}
                  className="hover:underline"
                >
                  {data.title}
                </Link>
              </h3>
            </div>

            {data.status === TaskStatus.PENDING ? (
              <TfiTimer className="size-10" />
            ) : null}
            {data.status === TaskStatus.IN_PROGRESS ? (
              <TfiLightBulb className="size-10" />
            ) : null}
            {data.status === TaskStatus.COMPLETED ? (
              <TfiCheckBox className="size-10" />
            ) : null}
          </div>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2 mb-4">
            <div className="flex items-center gap-1 text-gray-500">
              <TfiTime />

              <p className="text-xs font-medium">
                {new Date(data.created_at).toLocaleString("tr-TR")}
              </p>
            </div>
            <BsDot />
            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Created by {data.creator.username}
            </p>
          </div>
          <strong className="rounded border border-black bg-black px-3 py-1.5 text-[10px] font-medium text-white">
            Tag
          </strong>
        </div>
      </div>
    </article>
  );
};

export default Task;
