import React, { useState } from "react";
import { usePaginatedQuery } from "@tanstack/react-query";
import {  getData } from "../../data/axios";

export const Pagination = () => {
  const [page, setPage] = useState(1); // State to keep track of current page
  const [pageSize, setPageSize] = useState(10);

  const { resolvedData, isLoading, error, isPreviousData } = usePaginatedQuery({
    queryKey: ["blog", page, pageSize], // Include page and pageSize in queryKey
    queryFn: () => getData(page, pageSize),
    staleTime: 300000, // Optional: Time in milliseconds after which data is considered stale
  });

  const handlePreviousPage = () => {
    setPage((old) => Math.max(old - 1, 1));
  };

  const handleNextPage = () => {
    if (!isPreviousData && resolvedData && resolvedData.hasMore) {
      setPage((old) => old + 1);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={isPreviousData}>
          Next
        </button>
      </div>
    </div>
  );
};
