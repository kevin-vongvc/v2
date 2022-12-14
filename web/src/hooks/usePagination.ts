import React, { useMemo } from 'react';

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount: number;
};

export const DOTS = -1;

const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
}: PaginationProps): number[] => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // siblingCount + firstPage + lastPage + currentPage + 2x dots
    const totalVisibleButtonsCount = siblingCount + 5;

    if (totalVisibleButtonsCount >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, currentPage, siblingCount]);

  return paginationRange;
};
