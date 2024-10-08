import React from "react";
import { VscArrowCircleLeft } from "react-icons/vsc";
import NoData from "../../../assets/images/errors/NoData.svg";
import { Link } from "react-router-dom";

const DataNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-5/12" src={NoData} alt="404 Not Found" />
      <Link
        className="group relative inline-block focus:outline-none focus:ring"
        to="/"
      >
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

        <span className="relative inline-flex items-center border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
          Go Dashboard <VscArrowCircleLeft className="ml-1 size-6" />
        </span>
      </Link>
    </div>
  );
};

export default DataNotFound;
