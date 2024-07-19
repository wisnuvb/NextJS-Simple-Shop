import React, { FC } from "react";

import { paginationProps } from "@/utils/interfaces";

interface PaginationProps {
  pagination: paginationProps;
  total: number;
}

export const Pagination: FC<PaginationProps> = ({ pagination, total }) => {
  const { offset, handlePageChange, limit } = pagination;

  const totalPages = Math.ceil(total / limit);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (offset <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (offset >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", offset - 1, offset, offset + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex gap-1 mt-4">
      <button
        data-testid="btn-previous"
        onClick={() => handlePageChange(offset - 1)}
        disabled={offset === 1}
        className={`px-4 py-2 border rounded ${
          offset === 1 ? "cursor-not-allowed opacity-50" : "bg-white"
        }`}
      >
        Previous
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          data-testid="btn-page"
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          className={`px-4 py-2 mx-1 border rounded ${
            offset === page ? "bg-gray-400 text-white" : "bg-white"
          }`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}
      <button
        data-testid="btn-next"
        onClick={() => handlePageChange(offset + 1)}
        disabled={offset === totalPages}
        className={`px-4 py-2 border rounded ${
          offset === totalPages ? "cursor-not-allowed opacity-50" : "bg-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};
