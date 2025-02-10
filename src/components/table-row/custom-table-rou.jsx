import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { FilePenLine } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import CreateContact from "../add-contact/ContactForm";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { removeContactById } from "@/features/contacts/contactAPI";

const CustomRow = ({ contact, selected, handleCheckboxChange }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleContactRemove = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeContactById(id)).then(() => {
          Swal.fire({
            position: "top-center",
            text: "Contact deleted successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        });
      }
    });
  };
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={selected.includes(contact._id)}
          onCheckedChange={() => handleCheckboxChange(contact._id)}
        />
      </TableCell>
      <TableCell>{contact.name}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.note}</TableCell>
      <TableCell>{new Date(contact.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <span
          className={`text-sm font-medium ${
            contact.status === "ACTIVE" ? "text-green-600" : "text-red-600"
          }`}
        >
          {contact.status}
        </span>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {/* Update contact popUp button */}
            <DropdownMenuItem onClick={handleDialogOpen}>
              <FilePenLine color="green" /> Edit Contact
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleContactRemove(contact._id)}>
              <Trash2 color="red" /> Delete Contact
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogTitle>Edit Contact</DialogTitle>
            <CreateContact contactData={contact} />
          </DialogContent>
        </Dialog>
      )}
    </TableRow>
  );
};

export default CustomRow;
