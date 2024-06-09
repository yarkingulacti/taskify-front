export interface PaginationResponseMetadata {
  currentPage: number;
  totalPages: number;
  currentPageSize: number;
  totalItemsCount: number;
}

export interface PaginationResponse<T> {
  items: T[];
  meta: PaginationResponseMetadata;
}

export interface PaginationMetadata {
  skip: number;
  take: number;
}

export interface PageMetadata {
  currentPage: number;
  totalPages: number;
}

export interface PaginationProps extends PageMetadata {
  onPageChange: (page: number) => PaginationMetadata;
}
