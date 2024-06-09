import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { PaginationProps } from "./types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <button type="button">
        <BsChevronBarLeft />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button type="button">
        <BsChevronBarRight />
      </button>
    </div>
  );
};
