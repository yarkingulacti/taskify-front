import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./menu/sidebar/Sidebar";
import React from "react";
import { linkNodes } from "./menu/links";

export function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/") navigate("/dashboard");
  });

  return (
    <main className="flex h-screen w-screen">
      <Sidebar links={linkNodes} />
      <section className="p-16 w-full">
        <Outlet />
      </section>
    </main>
  );
}
