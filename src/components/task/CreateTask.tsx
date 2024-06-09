import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Icons } from "react-toastify";
import { VscDiffAdded } from "react-icons/vsc";
import { Formik } from "formik";
import { useTaskManager } from "../../contexts/TaskManager";
import { TaskCreateModel } from "../../models/Task.model";
import classNames from "classnames";
import useCustomStore from "../../stores/store";

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useCustomStore();
  const { createTask } = useTaskManager();

  function saveData(data: TaskCreateModel) {
    loading();
    createTask(data).then(() => {
      navigate("/tasks");
    });
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl text-center font-semibold">
        Towards new goals as you enhance! 🚀
      </h1>
      <Formik
        initialValues={{ title: "", description: "" }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.title.trim()) {
            errors.title = "You have to enter a Title for the task!";
          } else if (values.title.trim().split(" ").length > 10) {
            errors.title = "Title must be less than 100 characters!";
          }

          if (!values.description.trim()) {
            errors.description =
              "You have to enter a Description for the task!";
          } else if (values.description.trim().split(" ").length > 20) {
            errors.description =
              "Description must be less than 100 characters!";
          }

          for (const error of Object.values(errors)) {
            if (error.trim() !== "") {
              toast(error.trim(), {
                draggableDirection: "y",
                type: "error",
                autoClose: 2500,
                draggable: true,
                closeOnClick: true,
                icon: Icons.error,
                theme: "colored",
              });
            }
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          saveData(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit} className="mx-auto w-5/12 mt-16">
            <div className="w-full mt-3">
              <label
                htmlFor="title"
                className="block font-semibold text-xl mb-1"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                tabIndex={1}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
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
                  name="description"
                  tabIndex={2}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-2 w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
                  rows={6}
                  placeholder="Enter description of the task (optional)"
                ></textarea>
              </div>
            </div>
            <input type="submit" hidden />
            <div className="w-full flex justify-end mt-6">
              <button
                disabled={!isValid}
                tabIndex={3}
                type="submit"
                className="group relative inline-block focus:outline-none focus:ring"
              >
                <span
                  className={classNames(
                    "absolute inset-0 translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0",
                    {
                      "bg-yellow-300": isValid,
                      "bg-gray-400": !isValid,
                    }
                  )}
                ></span>

                <span className="relative inline-flex items-center border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Create Task <VscDiffAdded className="ml-1 size-6" />
                </span>
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTask;
