import React from "react";
import RouterHistoryContext from "./routerHistoryManager.context";
import { Location } from "react-router-dom";

export const RouterHistoryManagerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeRoute, setActiveRoute] = React.useState<Location | null>(null);
  const [history, setHistory] = React.useState<Location[]>([]);
  const [previousRoute, setPreviousRoute] = React.useState<Location | null>(
    null
  );

  React.useEffect(() => {
    if (activeRoute) {
      if (history.length > 0) setPreviousRoute(history[history.length - 1]);
      setHistory((prevHistory) => [...prevHistory, activeRoute]);
    }
  }, [activeRoute]);

  return (
    <RouterHistoryContext.Provider
      value={{
        activeRoute,
        setActiveRoute,
        previousRoute,
      }}
    >
      {children}
    </RouterHistoryContext.Provider>
  );
};
