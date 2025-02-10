import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useDispatch } from "react-redux";
import { postContacts, updateContactById } from "@/features/contacts/contactAPI";
import Swal from "sweetalert2";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Name must be at least 3 characters")
    .max(100, "Name will be maximum 100 characters")
    .required("Name is required"),
  email: yup.string().email("Enter your valid email").required("Email is required"),
  status: yup
    .string()
    .oneOf(["ACTIVE", "INACTIVE"], "Invalid status")
    .required("Status is required"),
  note: yup.string().max(100, "Note will be maximum 100 characters").optional(),
});

const CreateContact = ({ contactData = null }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (contactData) {
      // Populate the form with the existing contact's data
      setValue("name", contactData.name);
      setValue("email", contactData.email);
      setValue("status", contactData.status);
      setValue("note", contactData.note || "");
    }
  }, [contactData, setValue]);

  const onSubmit = (data) => {
    if (contactData) {
      // If contactData is provided, we update the contact
      dispatch(updateContactById({ id: contactData._id, updatedData: data }))
        .unwrap()
        .then(() => {
          return Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Contact updated successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    } else {
      dispatch(postContacts(data))
        .unwrap()
        .then(() => {
          return Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Contact added successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
    reset();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Create Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name *</Label>
          <Input
            {...register("name", {
              onBlur: () => trigger("name"),
              onChange: () => trigger("name"),
            })}
            placeholder="Enter your full Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label>Email</Label>
          <Input
            {...register("email", {
              onBlur: () => trigger("email"),
              onChange: () => trigger("email"),
            })}
            placeholder="Enter Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <Label>Status *</Label>
          <Select
            defaultValue={contactData?.status}
            onValueChange={(value) => setValue("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <div>
          <Label>Note</Label>
          <Textarea {...register("note")} placeholder="Enter Note" />
        </div>

        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-green-500">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
