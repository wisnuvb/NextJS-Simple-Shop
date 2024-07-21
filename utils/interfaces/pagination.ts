export interface PaginationProps {
  limit: number;
  offset: number;
  handlePageChange: (pageNumber: number) => void;
  handleLimitChange?: (limit: number) => void;
}
