import classNames from "classnames";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useRef } from "react";
import { MenuItem } from "../menu";

export const SidebarItem: React.FC<MenuItem> = ({ routePath, text, icon }) => {
  const { pathname } = useLocation();
  const marker = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLAnchorElement>(null);

  function handleMenuLinkItemHover(e: React.MouseEvent<HTMLLIElement>) {
    e.stopPropagation();

    if (pathname === routePath) return;

    for (const target of [marker.current, label.current]) {
      const targetEl = target as HTMLElement;
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

  return (
    <li
      onMouseEnter={handleMenuLinkItemHover}
      onMouseLeave={handleMenuLinkItemHover}
      className="cursor-pointer relative py-2"
    >
      <Link
        to={routePath}
        ref={label}
        hover-toggle-class="opacity-60"
        className={classNames("flex items-center p-2 gap-3", {
          "opacity-60": pathname !== routePath,
          "transition-opacity duration-150 ease-in-out": pathname !== routePath,
        })}
      >
        <React.Fragment>{icon}</React.Fragment>
        <span
          className={classNames("ml-2 text-xl text-black", {
            "font-medium": pathname === routePath,
            "font-light": pathname !== routePath,
          })}
        >
          {text}
        </span>
      </Link>
      <div
        ref={marker}
        className={classNames(
          "marker absolute start-full bottom-1/2 -translate-x-1 translate-y-1/2 h-8 w-0.5 bg-yellow-400",
          {
            "opacity-0 ": pathname !== routePath,
            "transition-opacity duration-150 ease-in-out":
              pathname !== routePath,
          }
        )}
        hover-toggle-class="opacity-0"
      ></div>
    </li>
  );
};
