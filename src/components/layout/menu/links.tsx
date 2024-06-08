import {
  VscCalendar,
  VscHistory,
  // VscSettingsGear,
  VscTasklist,
} from "react-icons/vsc";
import { SidebarItem } from "./sidebar/SidebarItem";

export const linkNodes: React.ReactNode[] = [
  <SidebarItem
    icon={<VscTasklist className="size-5" />}
    routePath="/tasks"
    text="List"
  />,
  <SidebarItem
    icon={<VscHistory className="size-5" />}
    routePath="/history"
    text="History"
  />,
  <SidebarItem
    icon={<VscCalendar className="size-5" />}
    routePath="/calendar"
    text="Calendar"
  />,
  // <SidebarItem
  //   icon={<VscSettingsGear />}
  //   routePath="/settings"
  //   text="Settings"
  // />,
];
