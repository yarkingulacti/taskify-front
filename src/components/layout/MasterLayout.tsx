import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./menu/sidebar/Sidebar";
import React from "react";
import links from "./menu/links";
import { SidebarItem } from "./menu/sidebar/SidebarItem";

export function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/") navigate("/dashboard");
  });

  return (
    <main className="flex h-screen w-screen">
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
      <section className="p-16 w-full">
        <Outlet />
      </section>
    </main>
  );
}
