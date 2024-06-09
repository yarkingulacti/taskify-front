import React from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import Typed from "typed.js";
import useCustomStore from "../../stores/store";

export const FullscreenLoader: React.FC = () => {
  const { isLoading, loading, done } = useCustomStore();
  const typed = React.useRef<Typed | null>(null);
  const typedElement = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  React.useEffect(() => {
    loading();

    _.delay(() => {
      typed.current?.destroy();
      done();
    }, 300);
  }, [location.pathname]);

  React.useEffect(() => {
    if (typedElement.current) {
      typed.current = new Typed(typedElement.current, {
        strings: ["Loading...", "Please wait..."],
        showCursor: false,
        typeSpeed: 50,
        loop: true,
      });

      typed.current.start();
    }
  }, [isLoading]);

  return isLoading ? (
    <div className="fixed inset-0 w-full h-full bg-white z-50 flex items-center justify-center">
      <div className="text-4xl" ref={typedElement}></div>
    </div>
  ) : null;
};
