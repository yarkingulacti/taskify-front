import React from "react";
import { Location } from "react-router-dom";

interface RouterHistoryManagerInterface {
  activeRoute: Location | null;
  setActiveRoute: React.Dispatch<React.SetStateAction<Location | null>>;
  previousRoute: Location | null;
}

const RouterHistoryManagerContext = React.createContext<
  RouterHistoryManagerInterface | undefined
>(undefined);

export const useRouterHistoryManager = () => {
  const context = React.useContext(RouterHistoryManagerContext);
  if (context === undefined) {
    throw new Error(
      "useRouterHistoryManager must be used within a RouterHistoryManagerContext"
    );
  }
  return context;
};

export default RouterHistoryManagerContext;
