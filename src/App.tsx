import React from "react";
import { TodoList } from "./components/TodoList";
// import { TodoHistory, TTodoHistoryItem } from "./components/TodoHistory";
import { TListItem } from "./components/ListItem";
import { SidebarMenu } from "./components/SidebarMenu";

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
  // const [remaingTodos, setRemainingTodos] = React.useState<number>(
  //   list.filter((item) => !item.completed).length
  // );
  // const [latestHistory, setLatestHistory] =
  //   React.useState<TTodoHistoryItem | null>(null);

  // React.useEffect(() => {
  //   setRemainingTodos(list.filter((item) => !item.completed).length);
  // }, [list]);
  return (
    <>
      <main className="flex h-screen w-screen">
        <SidebarMenu />
        <section className="p-16 w-full">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start justify-between w-2/3">
              <TodoList
                list={list}
                setList={setList}
                // remaingTodos={remaingTodos}
                // setLatestHistory={setLatestHistory}
              />
              {/* <TodoHistory latestHistory={latestHistory} /> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
