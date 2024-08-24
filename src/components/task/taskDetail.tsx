import React from "react";
import { useTaskManager } from "../../contexts/taskManager/taskManager.context";
import { ApiHelper } from "../helpers/api.helper";
import { useLocation } from "react-router-dom";

const apiHelper = new ApiHelper();
export const TaskDetail = () => {
  const location = useLocation();
  const { selectedTask, setSelectedTask } = useTaskManager();

  React.useEffect(() => {
    if (location.state?.id)
      apiHelper.taskDetail(location.state.id).then((res) => {
        if (res) setSelectedTask(res.data);
      });

    return () => {
      setSelectedTask(null);
    };
  }, []);

  return <>{JSON.stringify(selectedTask)}</>;
};
