import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./menu/sidebar/sidebar";
import React from "react";
import links from "./menu/links";
import { SidebarItem } from "./menu/sidebar/sidebarItem";

export function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/") navigate("/dashboard");
  });

  return (
    <main className="flex">
      <aside className="relative w-72 min-h-screen">
        <Sidebar
          links={links.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              routePath={item.routePath}
              text={item.text}
            />
          ))}
        />
      </aside>
      <section
        id="route-wrapper"
        className="p-12 flex-1 min-h-screen overflow-hidden"
      >
        <Outlet />
      </section>
    </main>
  );
}
