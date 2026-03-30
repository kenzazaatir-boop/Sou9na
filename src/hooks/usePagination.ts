import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
  initialPageSize?: number;
}

/**
 * Advanced pagination hook with proper typing
 */
export function usePagination<T>(
  items: T[],
  options: UsePaginationOptions = {}
) {
  const {
    itemsPerPage = 12,
    initialPage = 1,
    initialPageSize = itemsPerPage,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Calculate pagination values
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      currentPage,
      totalPages,
      totalItems: items.length,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, items.length),
      pageSize,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [items, currentPage, pageSize]);

  // Navigation methods
  const goToPage = useCallback(
    (page: number) => {
      const maxPage = Math.ceil(items.length / pageSize);
      setCurrentPage(Math.max(1, Math.min(page, maxPage)));
    },
    [items.length, pageSize]
  );

  const nextPage = useCallback(() => {
    const maxPage = Math.ceil(items.length / pageSize);
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  }, [items.length, pageSize]);

  const previousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const changePageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  return {
    ...paginationData,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    reset,
  };
}

/**
 * Hook for infinite scroll pagination
 */
export function useInfiniteScroll<T>(
  items: T[],
  { itemsPerPage = 10 } = {}
) {
  const [displayedCount, setDisplayedCount] = useState(itemsPerPage);

  const displayedItems = useMemo(() => items.slice(0, displayedCount), [items, displayedCount]);

  const hasMore = displayedCount < items.length;

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) => prev + itemsPerPage);
  }, [itemsPerPage]);

  const reset = useCallback(() => {
    setDisplayedCount(itemsPerPage);
  }, [itemsPerPage]);

  return {
    items: displayedItems,
    hasMore,
    loadMore,
    reset,
    displayedCount,
    totalCount: items.length,
  };
}
