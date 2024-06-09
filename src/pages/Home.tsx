import Banner from "../assets/images/banner.svg";
import { RiBrainLine } from "react-icons/ri";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl flex items-center mt-5 uppercase">
        <RiBrainLine className="mr-1 text-yellow-300" />{" "}
        <span className="underline underline-offset-4">Taskify</span>
      </h1>
      <p className="text-xl mt-5 italic font-medium">
        "Task"ing at it's finest!
      </p>
      <img src={Banner} alt="Taskify App Banner" className="w-6/12" />
    </div>
  );
}
