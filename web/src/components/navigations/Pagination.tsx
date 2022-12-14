import React from 'react';
import styled from '@emotion/styled/macro';
import { usePagination, DOTS } from '../../hooks/usePagination';
import ChevronLeft from '@icons/ChevronLeft';
import ChevronRight from '@icons/ChevronRight';

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: Function;
  siblingCount?: number;
};

const Container = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'center',
  marginTop: 60,
});

const Item = styled('button')(
  ({
    isActive,
    disabled = false,
  }: {
    isActive: boolean;
    disabled?: boolean;
  }) => ({
    padding: '0 12px',
    height: 32,
    textAlign: 'center',
    margin: 'auto 4px',
    display: 'flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    border: 'none',
    background: 'transparent',
    cursor: isActive && disabled ? 'initial' : 'pointer',
    fontSize: 20,
    fontWeight: 500,
    color: isActive ? 'var(--colors-primary)' : '',
    zIndex: 10,
    '&:hover': {
      '> svg path': {
        fill:
          isActive && disabled ? 'var(--colors-tag)' : 'var(--colors-primary)',
        stroke:
          isActive && disabled ? 'var(--colors-tag)' : 'var(--colors-primary)',
      },
      color: isActive && disabled ? '' : 'var(--colors-primary)',
    },
  }),
);

const Pagination = ({
  totalCount,
  siblingCount = 1,
  currentPage,
  onPageChange,
  pageSize,
}: PaginationProps): JSX.Element => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    currentPage,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Container>
      <li key="previous">
        <Item
          onClick={handlePrevious}
          disabled={currentPage === 1}
          isActive={currentPage === 1}
        >
          <ChevronLeft width={32} height={32} color={'var(--colors-tag)'} />
        </Item>
      </li>
      {paginationRange.map((pageNum, idx) => {
        if (pageNum === DOTS) {
          return (
            <li key={idx}>
              <Item isActive={false} disabled={true}>
                &#8230;
              </Item>
            </li>
          );
        }

        return (
          <li key={idx}>
            <Item
              onClick={() => onPageChange(pageNum)}
              isActive={currentPage === idx + 1}
              disabled={currentPage === idx + 1}
            >
              {pageNum}
            </Item>
          </li>
        );
      })}
      <li key="next">
        <Item
          onClick={handleNext}
          disabled={currentPage === lastPage}
          isActive={currentPage === lastPage}
        >
          <ChevronRight width={32} height={32} color={'var(--colors-tag)'} />
        </Item>
      </li>
    </Container>
  );
};

export default Pagination;
