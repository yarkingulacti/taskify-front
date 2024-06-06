import React from "react";
import { Button } from "flowbite-react";

export const HeaderNav: React.FC<{
  addMode: boolean;
  setAddMode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ addMode, setAddMode }) => {
  return (
    <header className="bg-slate-50 shadow-sm flex justify-center">
      <div className="inline-flex flex-col justify-center text-center font-medium text-2xl p-10">
        <h1 className="text-6xl">YATDA</h1>
        <span className="font-bold ml-1 text-sm">
          Guess what? It's built with{" "}
          <code className="bg-blue-700 p-1 rounded text-white">React</code>
        </span>
        <Button className="mt-2" onClick={() => setAddMode(!addMode)}>
          Add Todo
        </Button>
      </div>
    </header>
  );
};
