import React from "react";
import { TListItem } from "./task/Task";

export enum ETodoListHistoryAction {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface TTodoHistoryItem {
  id: string;
  action: ETodoListHistoryAction;
  date: Date;
  oldItem?: TListItem;
  newItem: TListItem;
}

export const TodoHistory: React.FC<{
  latestHistory: TTodoHistoryItem | null;
}> = ({ latestHistory }) => {
  const [history, setHistory] = React.useState<TTodoHistoryItem[]>([]);

  React.useEffect(() => {
    if (latestHistory) {
      setHistory([...history, latestHistory]);
    }
  }, [latestHistory]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline underline-offset-8 mb-2">
        Record History
      </h1>
      <ul>
        {history.length === 0 && (
          <h2 className="text-center font-medium text-lg">
            No actions have taken
          </h2>
        )}
        {history.length ? (
          <div className="flex items-center justify-between gap-2">
            <h3>Old</h3>
            <h3>New</h3>
          </div>
        ) : null}
        {history.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div>{item.newItem?.todo ?? "No old item"}</div>
            <div>{item.newItem.todo}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};
