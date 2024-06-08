import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/images/logos/taskify.svg";
import { DefaultListRenderer } from "../../DefaultListRenderer";

export const Sidebar: React.FC<{
  links: Array<React.ReactNode>;
}> = ({ links }) => {
  return (
    <div className="flex h-screen flex-col shadow-lg w-2/12 justify-start border-e border-blue-100 bg-white">
      <Link
        to="/"
        className="cursor-pointer flex flex-col items-center justify-center mt-3 mb-6"
      >
        {/* <Link to="/"> */}
        <img src={Logo} alt="Taskify App Logo" />
        <h1 className="text-xl font-semibold -mt-6 m-2">Taskify</h1>
        <p className="text-center italic font-medium text-sm">
          An app that exists for Tasks
        </p>
      </Link>
      <ul className="border-t border-gray-300 py-4 pl-4">
        <DefaultListRenderer
          list={links}
          noText={<h3>No Menu Items were specified!</h3>}
        />
      </ul>
    </div>
  );
};
