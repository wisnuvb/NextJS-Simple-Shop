import React from "react";
import { PaginationProps } from "@/utils/interfaces";

export const usePagination = () => {
  const [limit, setLimit] = React.useState(12);
  const [offset, setOffset] = React.useState(1);

  const handlePageChange = (pageNumber: number) => {
    setOffset(pageNumber);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
  };

  const pagination: PaginationProps = {
    limit,
    offset,
    handlePageChange,
    handleLimitChange,
  };

  return { pagination };
};
