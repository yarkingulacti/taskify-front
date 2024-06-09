import { VscListFlat } from "react-icons/vsc";
import { RiTimer2Line } from "react-icons/ri";
import { MenuItem } from "./menu";
import { HiViewBoards } from "react-icons/hi";

const links: MenuItem[] = [
  {
    icon: <VscListFlat className="size-7" />,
    routePath: "/tasks",
    text: "Tasks",
  },
  {
    icon: <RiTimer2Line className="size-7" />,
    routePath: "/calendar",
    text: "Calendar",
  },
  {
    icon: <HiViewBoards className="size-7" />,
    routePath: "/board",
    text: "Backlog",
  },
  // {
  //   icon: <VscSettingsGear className="size-7" />,
  //   routePath: "/settings"
  //   text: "Settings"
  // },
];

export default links;
