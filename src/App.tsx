import React from "react";
import { CreateTodoItem } from "./components/CreateTodoItem";
import { HeaderNav } from "./components/HeaderNav";
import { TodoList } from "./components/TodoList";
import { TodoHistory, TTodoHistoryItem } from "./components/TodoHistory";
import { TListItem } from "./components/ListItem";

export enum ETodoListHistoryAction {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

function App() {
  const [list, setList] = React.useState<TListItem[]>([
    { id: "1", owner: "John", todo: "Buy milk", completed: false },
    { id: "2", owner: "Doe", todo: "Buy eggs", completed: true },
    { id: "3", owner: "Jane", todo: "Buy bread", completed: false },
  ]);
  const [remaingTodos, setRemainingTodos] = React.useState<number>(
    list.filter((item) => !item.completed).length
  );
  const [addMode, setAddMode] = React.useState<boolean>(false);
  const [latestHistory, setLatestHistory] =
    React.useState<TTodoHistoryItem | null>(null);

  React.useEffect(() => {
    setRemainingTodos(list.filter((item) => !item.completed).length);
  }, [list]);
  return (
    <main className="h-screen w-screen">
      <CreateTodoItem
        list={list}
        setList={setList}
        toggled={addMode}
        setToggled={setAddMode}
      />

      <HeaderNav addMode={addMode} setAddMode={setAddMode} />
      <section className="p-16">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start justify-between w-2/3">
            <TodoList
              list={list}
              setList={setList}
              remaingTodos={remaingTodos}
              setLatestHistory={setLatestHistory}
            />
            <TodoHistory latestHistory={latestHistory} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
