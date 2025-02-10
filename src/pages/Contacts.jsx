import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Filter } from "lucide-react";
import { Download } from "lucide-react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateContact from "@/components/add-contact/ContactForm";
import { useState } from "react";
import { Tooltip } from "@/lib/Tooltip";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentProfile } from "@/features/auth/authSlice";
import { fetchContacts } from "@/features/contacts/contactAPI";
import clsx from "clsx";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { isLast7Days, isToday, normalizeDate } from "@/lib/date-compire";
import { SkeletonDemo } from "@/components/skeleton/tableSkeleton";
import CustomRow from "@/components/table-row/custom-table-rou";
import TablePagination from "@/components/pagination/TablePagination";

const ContactPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState("all");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { contacts, loading, currentPage, limit, totalPage } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    dispatch(currentProfile());
    dispatch(fetchContacts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      setFilteredContacts(contacts);
    }
  }, [contacts]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      dispatch(fetchContacts({ page: newPage, limit }));
    }
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    dispatch(fetchContacts({ page: 1, limit: newLimit }));
  };

  const performSearch = (value) => {
    setSearchTerm(value);
    filterContacts(value, filtered, status, selectedDate);
  };

  /* Filter table contacts */
  const toggleFilterPanel = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const performFilter = (value) => {
    setFiltered(value);
    if (value === "all") {
      setSelectedDate(null);
      setStatus("");
      setFilteredContacts(contacts); // Show all contacts
    } else {
      filterContacts(searchTerm, value, status, selectedDate);
    }
  };

  const filterStatus = (value) => {
    setStatus(value);
    filterContacts(searchTerm, filtered, value, selectedDate);
  };

  const filterByDate = (date) => {
    setSelectedDate(new Date(date));
    filterContacts(searchTerm, filtered, status, date);
  };

  const filterContacts = (searchTerm, filterValue, statusValue, selectedDate) => {
    let filteredData = contacts;

    // Apply search filter
    if (searchTerm) {
      filteredData = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusValue) {
      filteredData = filteredData.filter((contact) => contact.status === statusValue);
    }

    // Apply selected date filter
    if (selectedDate) {
      const normalizedSelectedDate = normalizeDate(selectedDate);
      filteredData = contacts.filter((contact) => {
        const contactDate = normalizeDate(contact.createdAt);
        return contactDate.getTime() === normalizedSelectedDate.getTime();
      });
    }

    // Apply date filter based on `createdAt`
    if (filterValue === "today") {
      setSelectedDate(null);
      filteredData = contacts.filter((contact) => isToday(contact.createdAt));
    } else if (filterValue === "last7Days") {
      setSelectedDate(null);
      filteredData = contacts?.filter((contact) => isLast7Days(contact.createdAt));
    }

    setFilteredContacts(filteredData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="flex justify-end items-center bg-white p-4 shadow rounded-md">
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <h3 className="font-semibold text-gray-800">{profile?.name}</h3>
            <p className="text-sm text-gray-500">{profile?.role}</p>
          </div>
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white">
            {profile?.name[0]}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-6 bg-white rounded-md shadow p-4">
        <div className="flex flex-wrap justify-between md:items-center mb-4">
          <h2 className="text-lg font-semibold">Contact</h2>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
            <form>
              <Input
                onChange={(e) => performSearch(e.target.value)}
                id="search"
                type="search"
                className="h-10"
                placeholder="Search..."
              />
            </form>
            <Tooltip text={"Filter"}>
              <Button variant="outline" className="md:h-10" onClick={toggleFilterPanel}>
                <Filter /> <span className="hidden md:block">Filter</span>
              </Button>
            </Tooltip>
            <Tooltip text={"Export"}>
              <Button variant="outline" className="md:h-10">
                <Download /> <span className="hidden md:block">Export</span>
              </Button>
            </Tooltip>
            <Tooltip text={"Import"}>
              <Button variant="outline" className="md:h-10">
                <Upload /> <span className="hidden md:block">Import</span>
              </Button>
            </Tooltip>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="md:h-10 bg-green-600 text-white hover:bg-green-800"
                >
                  New <span className="hidden md:block">Add New Contact</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle></DialogTitle>
                <CreateContact />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className={clsx(isOpen === true ? "block" : "hidden")}>
          <p className="text-sm text-gray-500 mb-4">Manage all Contacts</p>
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
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={filterByDate}
                    initialFocus
                  />
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
        </div>

        {/* Table */}
        <Table className="mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading && filteredContacts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-3xl py-4">
                  No Result
                </TableCell>
              </TableRow>
            )}
            {loading ? (
              <TableRow>
                <TableCell colSpan={12}>
                  <SkeletonDemo />
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => <CustomRow key={contact._id} contact={contact} />)
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          contacts={contacts}
          currentPage={currentPage}
          totalPage={totalPage}
          limit={limit}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default ContactPage;
