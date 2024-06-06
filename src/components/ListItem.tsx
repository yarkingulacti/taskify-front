import React from "react";
import { ETodoListHistoryAction } from "../App";
import _ from "lodash";

export interface TListItem {
  id: string;
  owner: string;
  todo: string;
  completed: boolean;
}

const ListItem: React.FC<
  TListItem & {
    historyOccur?: (data: {
      id: string;
      old: TListItem;
      new: TListItem;
      action: ETodoListHistoryAction;
    }) => void;
    modifyItem?: (data: TListItem) => void;
  }
> = ({ id, owner, todo, completed, historyOccur, modifyItem }) => {
  const [text, setText] = React.useState(todo);
  const [checked, setChecked] = React.useState(completed);

  const updateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    const func = _.debounce(() => {
      if (modifyItem) {
        modifyItem({ id, owner, todo: e.target.value, completed });
      }
      if (historyOccur) {
        historyOccur({
          id,
          old: { id, owner, todo, completed },
          new: { id, owner, todo: e.target.value, completed },
          action: ETodoListHistoryAction.UPDATE,
        });
      }
    }, 500);

    func();
  };

  const updateCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    const func = _.debounce(() => {
      if (modifyItem) {
        modifyItem({ id, owner, todo, completed: e.target.checked });
      }
      if (historyOccur) {
        historyOccur({
          id,
          old: { id, owner, todo, completed },
          new: { id, owner, todo, completed: e.target.checked },
          action: ETodoListHistoryAction.UPDATE,
        });
      }
    }, 1000);

    func();
  };
  return (
    <div className="flex items-end gap-2 p-2">
      <span className="font-semibold text-lg">#{id}</span>
      <input type="checkbox" onChange={updateCompleted} checked={checked} />
      <span className={checked ? "mx-2 text-xl line-through" : "mx-2 text-xl"}>
        {todo}
      </span>
      <span className="text-sm font-medium">by {owner}</span>
    </div>
  );
};

export default ListItem;
