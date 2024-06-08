import React from "react";
import { TfiTimer, TfiLightBulb, TfiCheckBox, TfiTime } from "react-icons/tfi";
import { BsDot } from "react-icons/bs";
import { TaskModel, TaskStatus } from "../../models/Task.model";

const Task: React.FC<{
  data: TaskModel;
}> = ({ data }) => {
  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div className="flex items-center sm:gap-8">
        {data.status === TaskStatus.PENDING ? (
          <TfiTimer className="size-16" />
        ) : null}
        {data.status === TaskStatus.IN_PROGRESS ? (
          <TfiLightBulb className="size-16" />
        ) : null}
        {data.status === TaskStatus.COMPLETED ? (
          <TfiCheckBox className="size-16" />
        ) : null}
        <div>
          <strong className="rounded border border-yellow-300 bg-yellow-300 px-3 py-1.5 text-[10px] font-medium text-black">
            Episode #101
          </strong>

          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <a href="#" className="hover:underline">
              {" "}
              {data.title}
            </a>
          </h3>

          {data.description && (
            <p className="mt-1 text-sm text-gray-700">{data.description}</p>
          )}

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <TfiTime />

              <p className="text-xs font-medium">48:32 minutes</p>
            </div>

            <BsDot />

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Created by {data.creator.username}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Task;
