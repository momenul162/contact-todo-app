// src/redux/contactsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  postContacts,
  removeContactById,
  removeContactByIds,
  updateContactById,
} from "./contactAPI";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPage: 0,
  limit: 10,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* Fetch all contacts */
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.data;
        state.limit = action.payload.pagination.limit;
        state.currentPage = action.payload.pagination.page;
        state.totalPage = action.payload.pagination.totalPage;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // post new contact
      .addCase(postContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload.data);
      })
      .addCase(postContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Remove contact by id */
      .addCase(removeContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeContactById.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the contact from the contacts list
        console.log(action.payload);
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
      })
      .addCase(removeContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Remove contact by ids */
      .addCase(removeContactByIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeContactByIds.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.contacts = state.contacts.filter((contact) => !action.payload.includes(contact._id));
      })
      .addCase(removeContactByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Update contact by id */
      .addCase(updateContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.map((contact) =>
          contact._id === action.payload.id
            ? { ...contact, ...action.payload.updatedData }
            : contact
        );
      })
      .addCase(updateContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactsSlice.reducer;
