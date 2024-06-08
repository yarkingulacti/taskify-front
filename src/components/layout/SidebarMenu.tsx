import React from "react";
import classNames from "classnames";
import Logo from "../../assets/images/logos/taskify-logo.png";
// import { Link } from "react-router-dom";
import {
  VscDiffAdded,
  VscSettingsGear,
  VscHistory,
  VscTasklist,
  VscCalendar,
} from "react-icons/vsc";

export const SidebarMenu: React.FC = () => {
  function handleMenuLinkItemHover(e: MouseEvent) {
    e.stopPropagation();

    const el = e.target as HTMLLIElement;
    const targets =
      el.attributes.getNamedItem("aria-controls")?.value.split(",") ?? [];

    if (!targets.length) return;

    for (const target of targets) {
      const targetEl = el.querySelector(target.trim());
      if (targetEl) {
        const targetElHoverToggleClass =
          targetEl.attributes.getNamedItem("hover-toggle-class");
        if (
          targetElHoverToggleClass !== null &&
          targetElHoverToggleClass.value !== undefined
        ) {
          targetEl.classList.toggle(targetElHoverToggleClass.value);
        }
      }
    }
  }

  React.useEffect(() => {
    const list = document.querySelectorAll<HTMLLIElement>(
      "li[aria-controls='.marker,.label']"
    );

    list.forEach((link) => {
      link.addEventListener("mouseenter", handleMenuLinkItemHover);
      link.addEventListener("mouseleave", handleMenuLinkItemHover);
    });

    return () => {
      list.forEach((link) => {
        link.removeEventListener("mouseenter", handleMenuLinkItemHover);
        link.removeEventListener("mouseleave", handleMenuLinkItemHover);
      });
    };
  }, []);
  return (
    <div className="flex h-screen flex-col shadow-lg w-48 justify-start border-e border-blue-100 bg-white">
      <div className="cursor-pointer flex flex-col items-center justify-center mt-3 mb-6">
        {/* <Link to="/"> */}
        <img className="w-10" src={Logo} alt="Taskify App Logo" />
        <h1 className="text-xl font-semibold m-2">Taskify</h1>
        <p className="text-center italic font-medium text-sm">
          An app that exists for Tasks
        </p>
        {/* </Link> */}
      </div>
      <ul className="border-t border-gray-300">
        <li
          aria-controls=".marker,.label"
          className="cursor-pointer relative py-2"
        >
          <a
            href="#"
            hover-toggle-class="opacity-60"
            className="flex items-center p-2 label transition-opacity duration-150 ease-in-out opacity-60"
          >
            <VscSettingsGear className="size-5 opacity-75" />
            <span className="ml-2 text-sm font-medium text-black">
              Settings
            </span>
          </a>
          <div
            hover-toggle-class="opacity-0"
            className={classNames(
              "marker absolute start-full bottom-1/2 -translate-x-1 translate-y-1/2 h-6 w-0.5 bg-blue-700 opacity-0 transition-opacity duration-150 ease-in-out"
            )}
          ></div>
        </li>
        <li
          aria-controls=".marker,.label"
          className="cursor-pointer relative py-2"
        >
          <a
            href="#"
            hover-toggle-class="opacity-60"
            className="flex items-center p-2 label transition-opacity duration-150 ease-in-out opacity-60"
          >
            <VscTasklist className="size-5 opacity-75" />
            <span className="ml-2 text-sm font-medium text-black">Tasks</span>
          </a>
          <div
            hover-toggle-class="opacity-0"
            className="marker absolute start-full bottom-1/2 -translate-x-1 translate-y-1/2 h-6 w-0.5 bg-blue-700 opacity-0 transition-opacity duration-150 ease-in-out"
          ></div>
        </li>
        <li
          aria-controls=".marker,.label"
          className="cursor-pointer relative py-2"
        >
          <a
            href="#"
            hover-toggle-class="opacity-60"
            className="flex items-center p-2 label transition-opacity duration-150 ease-in-out opacity-60"
          >
            <VscDiffAdded className="size-5 opacity-75" />
            <span className="ml-2 text-sm font-medium text-black">
              Create Task
            </span>
          </a>
          <div
            hover-toggle-class="opacity-0"
            className="marker absolute start-full bottom-1/2 -translate-x-1 translate-y-1/2 h-6 w-0.5 bg-blue-700 opacity-0 transition-opacity duration-150 ease-in-out"
          ></div>
        </li>
        <li
          aria-controls=".marker,.label"
          className="cursor-pointer relative py-2"
        >
          <a
            href="#"
            hover-toggle-class="opacity-60"
            className="flex items-center p-2 label transition-opacity duration-150 ease-in-out opacity-60"
          >
            <VscHistory className="size-5 opacity-75" />
            <span className="ml-2 text-sm font-medium text-black">
              Task History
            </span>
          </a>
          <div
            hover-toggle-class="opacity-0"
            className="marker absolute start-full bottom-1/2 -translate-x-1 translate-y-1/2 h-6 w-0.5 bg-blue-700 opacity-0 transition-opacity duration-150 ease-in-out"
          ></div>
        </li>
        <li
          aria-controls=".marker,.label"
          className="cursor-pointer relative py-2"
        >
          <a
            href="#"
            hover-toggle-class="opacity-60"
            className="flex items-center p-2 label transition-opacity duration-150 ease-in-out opacity-60"
          >
            <VscCalendar className="size-5 opacity-75" />
            <span className="ml-2 text-sm font-medium text-black">
              Task Calendar
            </span>
          </a>
          <div
            hover-toggle-class="opacity-0"
            className="marker absolute start-full bottom-1/2 -translate-x-1 translate-y-1/2 h-6 w-0.5 bg-blue-700 opacity-0 transition-opacity duration-150 ease-in-out"
          ></div>
        </li>
      </ul>
    </div>
  );
};
