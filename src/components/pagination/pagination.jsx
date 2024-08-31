import React from 'react';
import { Button, Typography } from "@material-tailwind/react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Number of pages to show at a time
  const PAGE_COUNT = 5;

  const getVisiblePages = () => {
    let startPage, endPage;

    if (totalPages <= PAGE_COUNT) {
      // If total pages are less than or equal to PAGE_COUNT, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages
      if (currentPage <= Math.ceil(PAGE_COUNT / 2)) {
        startPage = 1;
        endPage = PAGE_COUNT;
      } else if (currentPage + Math.floor(PAGE_COUNT / 2) >= totalPages) {
        startPage = totalPages - PAGE_COUNT + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(PAGE_COUNT / 2);
        endPage = currentPage + Math.floor(PAGE_COUNT / 2);
      }
    }

    // Generate page numbers
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
      <Button
        color="light-blue"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`rounded-full border border-light-blue-500 text-white hover:bg-black ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Prev
      </Button>

      {currentPage > PAGE_COUNT && (
        <>
          <Button
            color="gray"
            size="sm"
            onClick={() => onPageChange(1)}
            className="rounded-full border border-gray-500 text-gray-500 hover:bg-gray-100"
          >
            1
          </Button>
          <Typography className="text-gray-500 text-xs md:text-sm">
            ...
          </Typography>
        </>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          color={currentPage === page ? "light-blue" : "gray"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={`rounded-full ${currentPage === page ? 'bg-light-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - PAGE_COUNT && (
        <>
          <Typography className="text-gray-500 text-xs md:text-sm">
            ...
          </Typography>
          <Button
            color="gray"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className="rounded-full border border-gray-500 text-gray-500 hover:bg-gray-100"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        color="light-blue"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`rounded-full border border-light-blue-500 text-white hover:bg-black ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
