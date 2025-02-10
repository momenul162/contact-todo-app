import baseURL from "@/lib/baseUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data } = await baseURL.get(`/contacts?page=${page}&limit=${limit}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch contacts");
    }
  }
);

export const postContacts = createAsyncThunk(
  "contacts/postContacts",
  async (contactData, { rejectWithValue }) => {
    console.log(contactData);
    try {
      const { data } = await baseURL.post(`/contacts`, contactData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add contact");
    }
  }
);

export const removeContactById = createAsyncThunk(
  "contacts/removeContactById",
  async (id, { rejectWithValue }) => {
    try {
      await baseURL.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove contact");
    }
  }
);

export const removeContactByIds = createAsyncThunk(
  "contacts/removeContactByIds",
  async (ids, { rejectWithValue }) => {
    try {
      const { data } = await baseURL(`/contacts`, {
        method: "delete",
        data: ids,
      });
      return data.data.deleted;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove contacts");
    }
  }
);

export const updateContactById = createAsyncThunk(
  "contacts/updateContactById",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      await baseURL.patch(`/contacts/${id}`, updatedData);
      return { id, updatedData };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update contact");
    }
  }
);
