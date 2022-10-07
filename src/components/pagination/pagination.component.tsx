import { ChangeEvent, Fragment } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../utlis/usePagination';
import './pagination.styles.scss';

type PaginationProps = {
    onPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
    className: string;
};

const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
}: PaginationProps) => {

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = ({onPageChange, currentPage}) => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = ({onPageChange, currentPage}) => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
  <>
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  </>
  );
};

export default Pagination;