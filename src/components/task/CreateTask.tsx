import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { VscDiffAdded } from "react-icons/vsc";
import { useFormik } from "formik";
import { useTaskManager } from "../../contexts/TaskManager";
import { TaskCreateModel } from "../../models/Task.model";
import classNames from "classnames";
import useCustomStore from "../../stores/store";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useCustomStore();
  const { createTask } = useTaskManager();
  const { errors, handleSubmit, handleChange, values, isValid } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      saveData(values);
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema,
  });

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
      <form onSubmit={handleSubmit} className="mx-auto w-5/12 mt-16">
        <div className="w-full mt-3">
          <label htmlFor="title" className="block font-semibold text-xl mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            tabIndex={1}
            value={values.title}
            onChange={handleChange}
            className={classNames(
              "w-full p-2 shadow-md border border-gray-300 rounded-md",
              {
                "border-2 border-red-400 shadow-md shadow-red-200":
                  errors.title,
              }
            )}
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
          <textarea
            id="description"
            name="description"
            tabIndex={2}
            value={values.description}
            onChange={handleChange}
            className={classNames(
              "p-2 w-full resize-none align-top sm:text-sm rounded-md shadow-md",
              {
                "border-2 border-red-400 shadow-red-200": errors.description,
              }
            )}
            rows={6}
            placeholder="Enter description of the task (optional)"
          ></textarea>
        </div>
        <input type="submit" hidden />
        <div className="w-full flex justify-end mt-6">
          <button
            disabled={!isValid}
            tabIndex={3}
            type="submit"
            className={classNames(
              "group relative inline-block focus:outline-none focus:ring",
              {
                "cursor-not-allowed opacity-50": !isValid,
              }
            )}
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
    </div>
  );
};

export default CreateTask;
