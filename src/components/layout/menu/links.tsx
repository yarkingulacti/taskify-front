import {
  VscCalendar,
  VscHistory,
  // VscSettingsGear,
  VscTasklist,
} from "react-icons/vsc";
import { MenuItem } from "./menu";

const links: MenuItem[] = [
  {
    icon: <VscTasklist className="size-5" />,
    routePath: "/tasks",
    text: "List",
  },
  {
    icon: <VscHistory className="size-5" />,
    routePath: "/history",
    text: "History",
  },
  {
    icon: <VscCalendar className="size-5" />,
    routePath: "/calendar",
    text: "Calendar",
  },
  // {
  //   icon: <VscSettingsGear className="size-5" />,
  //   routePath: "/settings"
  //   text: "Settings"
  // },
];

export default links;
