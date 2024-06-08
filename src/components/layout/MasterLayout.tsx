import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarMenu } from "./SidebarMenu";
import React from "react";

export function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/") navigate("/dashboard");
  });

  return (
    <main className="flex h-screen w-screen">
      <SidebarMenu />
      <Outlet />
    </main>
  );
}
