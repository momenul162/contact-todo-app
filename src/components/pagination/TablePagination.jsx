import { ChevronsRight } from "lucide-react";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronsLeft } from "lucide-react";

const TablePagination = ({
  contacts,
  currentPage,
  handleLimitChange,
  handlePageChange,
  totalPage,
  limit,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">of {contacts.length} Selected</p>

      <div className="flex items-center space-x-2">
        <Button variant="outline" disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPage}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(totalPage)}
        >
          <ChevronsRight />
        </Button>
      </div>
      <select
        className="p-2 border rounded-md focus:outline-none"
        value={limit}
        onChange={handleLimitChange}
      >
        <option value="10">10 / page</option>
        <option value="20">20 / page</option>
        <option value="50">50 / page</option>
        <option value="100">100 / page</option>
      </select>
    </div>
  );
};

export default TablePagination;
