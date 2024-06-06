import { Button, Drawer, Label, Textarea, TextInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi2";
import { IDBPDatabase, openDB } from "idb";
import { TListItem } from "./ListItem";
import React from "react";

interface ICreateTodoItemProps {
  list: TListItem[];
  setList: React.Dispatch<React.SetStateAction<TListItem[]>>;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

let db: IDBPDatabase<TListItem>;

export const CreateTodoItem: React.FC<ICreateTodoItemProps> = ({
  list,
  setList,
  toggled,
  setToggled,
}) => {
  const initDB = async () => {
    db = await openDB<TListItem>("todo-app", 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains("todos")) {
          database.createObjectStore("todos", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  };

  function createTodoItem() {
    //TODO add react toastify lib instead of default alert
    const textArea = document.getElementById("todo") as HTMLTextAreaElement;
    const { value: person } = document.getElementById(
      "person"
    ) as HTMLInputElement;

    if (
      (!textArea.value || !person) &&
      (textArea.value.trim() === "" || person.trim() === "")
    ) {
      alert("Please fill in the fields");
      return;
    }

    const newTodo: TListItem = {
      id: String(list.length + 1),
      owner: person.trim(),
      todo: textArea.value.trim(),
      completed: false,
    };

    setList([...list, newTodo]);
    setToggled(false);
    initDB()
      .then(() => {
        return db.add("todos", newTodo);
      })
      .then(() => {
        console.log(
          `Added new todo item with ${newTodo.id} to the database table todos`
        );
      })
      .catch((error) => {
        console.error("Error connecting to database", error);
      });
  }

  return (
    <Drawer
      open={toggled}
      onClose={() => {
        setToggled(false);

        const input = document.getElementById("person") as HTMLInputElement;
        const textArea = document.getElementById("todo") as HTMLTextAreaElement;

        if (input) input.value = "";
        if (textArea) textArea.value = "";
      }}
    >
      <Drawer.Header title="Create a Task" titleIcon={HiPlus} />
      <Drawer.Items>
        <div className="mb-6 mt-3">
          <Label htmlFor="person" className="mb-2 block">
            Who are you?
          </Label>
          <TextInput
            id="person"
            name="person"
            placeholder="John Doe"
            type="text"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="todo" className="mb-2 block">
            What to do next?
          </Label>
          <Textarea
            id="todo"
            name="todo"
            placeholder="What's on your mind?"
            rows={4}
          />
        </div>
        <div className="mb-6">
          <Button onClick={createTodoItem} type="button" className="w-full">
            Create a Task
          </Button>
        </div>
      </Drawer.Items>
    </Drawer>
  );
};
