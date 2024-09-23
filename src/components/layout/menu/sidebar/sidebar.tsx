import React from "react";
import Logo from "../../../../assets/images/logo/logo-no-background.png";
import { DefaultListRenderer } from "../../../helpers/list-render-helper";
import { useNavigate } from "react-router-dom";

export const Sidebar: React.FC<{
  links: Array<React.ReactNode>;
}> = ({ links }) => {
  const navigate = useNavigate();
  return (
    <div className="border-r-2 border-r-stone-200 bg-white fixed top-0 left-0 h-full w-72 z-50">
      {/* <Link to="/"> */}
      <img
        src={Logo}
        alt="Taskify App Logo"
        className="cursor-pointer h-1/5 mx-auto my-4"
        onClick={() => navigate("/")}
      />
      <ul className="border-t border-stone-200 py-4 pl-4">
        <DefaultListRenderer
          list={links}
          noText={<h3>No Menu Items were specified!</h3>}
        />
      </ul>
    </div>
  );
};
