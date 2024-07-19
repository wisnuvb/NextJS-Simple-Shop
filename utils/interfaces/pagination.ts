export interface paginationProps {
  limit: number;
  offset: number;
  handlePageChange: (pageNumber: number) => void;
  handleLimitChange?: (limit: number) => void;
}
