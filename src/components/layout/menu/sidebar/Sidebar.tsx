import React from "react";
import Logo from "../../../../assets/images/logo/logo-no-background.png";
import { DefaultListRenderer } from "../../DefaultListRenderer";
import { useNavigate } from "react-router-dom";

export const Sidebar: React.FC<{
  links: Array<React.ReactNode>;
}> = ({ links }) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col shadow-lg w-2/12 justify-start border-e border-blue-100 bg-white">
      {/* <Link to="/"> */}
      <img
        src={Logo}
        alt="Taskify App Logo"
        className="cursor-pointer h-1/5 mx-auto my-4"
        onClick={() => navigate("/")}
      />
      <ul className="border-t border-gray-300 py-4 pl-4">
        <DefaultListRenderer
          list={links}
          noText={<h3>No Menu Items were specified!</h3>}
        />
      </ul>
    </div>
  );
};
