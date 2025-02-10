import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import clsx from "clsx";
import { format } from "date-fns";

const FilterButtons = ({
  performFilter,
  filtered,
  status,
  selectedDate,
  filterByDate,
  filterStatus,
}) => {
  return (
    <div className="md:flex items-center gap-4">
      <div className="inline-flex rounded-md shadow-sm">
        <Button
          onClick={() => performFilter("all")}
          className={clsx(
            "md:h-8 rounded-l-lg",
            filtered === "all" ? "bg-gray-600 text-white" : " text-gray-700"
          )}
        >
          All
        </Button>
        <Button
          onClick={() => performFilter("today")}
          className={clsx(
            "md:h-8",
            filtered === "today" ? "bg-gray-600 text-white" : " text-gray-700"
          )}
        >
          Today
        </Button>
        <Button
          onClick={() => performFilter("last7Days")}
          className={clsx(
            "md:h-8",
            filtered === "last7Days" ? "bg-gray-600 text-white" : " text-gray-700"
          )}
        >
          Last 7 days
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => performFilter("filterByDate")}
              variant="outline"
              className={clsx(
                "md:h-8 rounded-r-lg flex items-center space-x-2",
                filtered === "filterByDate" ? "bg-gray-600 text-white" : " text-gray-700"
              )}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>{selectedDate ? format(selectedDate, "PPP") : "Select Date Range"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={selectedDate} onSelect={filterByDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex">
        <Button
          onClick={() => filterStatus("ACTIVE")}
          className={clsx(
            "md:h-8 rounded-l-lg transition-colors",
            status === "ACTIVE" ? "bg-gray-600 text-white" : " text-gray-700"
          )}
        >
          Active
        </Button>
        <Button
          onClick={() => filterStatus("INACTIVE")}
          className={clsx(
            "md:h-8 rounded-r-lg transition-colors",
            status === "INACTIVE" ? "bg-gray-600 text-white" : " text-gray-700"
          )}
        >
          Inactive
        </Button>
      </div>
    </div>
  );
};

export default FilterButtons;
