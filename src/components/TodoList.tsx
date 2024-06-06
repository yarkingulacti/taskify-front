import React from "react";
import ListItem, { TListItem } from "./ListItem";
import { TTodoHistoryItem } from "./TodoHistory";

export const TodoList: React.FC<{
  setLatestHistory: React.Dispatch<
    React.SetStateAction<TTodoHistoryItem | null>
  >;
  list: TListItem[];
  setList: React.Dispatch<React.SetStateAction<TListItem[]>>;
  remaingTodos: number;
}> = ({ setLatestHistory, list, setList, remaingTodos }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline underline-offset-8 mb-2">
        {remaingTodos
          ? `Remaining Todos: ${remaingTodos}`
          : "You've done them all!"}
      </h1>
      <ul>
        {list.map((item) => (
          <ListItem
            key={item.id}
            {...item}
            historyOccur={(data) => {
              setLatestHistory({
                id: data.id,
                action: data.action,
                date: new Date(),
                oldItem: data.old,
                newItem: data.new,
              });
            }}
            modifyItem={(item) => {
              const idx = list.findIndex((i) => i.id === item.id);
              if (idx === -1) return;
              setList([...list.slice(0, idx), item, ...list.slice(idx + 1)]);
            }}
          />
        ))}
      </ul>
    </div>
  );
};
