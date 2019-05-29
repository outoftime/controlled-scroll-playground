export interface PagesProps {
  currentPage: number;
  onCurrentPageChange: (number) => void;
  smoothScroll: boolean;
  totalPages: number;
}
