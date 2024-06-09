import React from "react";
import { useNavigate } from "react-router-dom";
import { VscDiffAdded } from "react-icons/vsc";
import { useTaskManager } from "../../contexts/TaskManager";

const CreateTask: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const navigate = useNavigate();
  const { createTask } = useTaskManager();

  function saveData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //TODO validate the form data with formik
    createTask(
      {
        title,
        description,
      },
      () => {
        navigate("/tasks");
      }
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl text-center font-semibold">
        Towards new goals as you enhance! 🚀
      </h1>
      <form onSubmit={saveData} className="mx-auto w-5/12 mt-16">
        <div className="w-full mt-3">
          <label htmlFor="title" className="block font-semibold text-xl mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 shadow-md border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="Enter title of the task"
          />
        </div>
        <div className="w-full my-3">
          <label
            htmlFor="description"
            className="block font-semibold text-xl mb-1"
          >
            Description
          </label>

          <div className="overflow-hidden shadow-md rounded-lg border border-gray-200 focus:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
              rows={6}
              placeholder="Enter description of the task (optional)"
            ></textarea>
          </div>
        </div>
        <div className="w-full flex justify-end mt-6">
          <button
            type="submit"
            className="group relative inline-block focus:outline-none focus:ring"
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative inline-flex items-center border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              Create Task <VscDiffAdded className="ml-1 size-6" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
