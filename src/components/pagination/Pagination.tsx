import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { PaginationProps } from "./types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  function pageChange(direction: 1 | -1) {
    let newPage: number;

    if (direction === 1) {
      newPage = currentPage + 1;
    } else {
      newPage = currentPage - 1;
    }

    switch (direction) {
      case -1:
        if (currentPage <= 1) newPage = 1;
        break;
      case 1:
        if (currentPage >= totalPages) newPage = totalPages;
        break;
    }

    onPageChange(newPage);
  }

  return (
    <div className="w-full flex items-center justify-center gap-4">
      <button type="button" onClick={() => pageChange(-1)}>
        <BsChevronBarLeft />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button type="button" onClick={() => pageChange(1)}>
        <BsChevronBarRight />
      </button>
    </div>
  );
};
