// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../contacts/contactSlice";
import profileReducer from "../auth/authSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    profile: profileReducer,
  },
});

export default store;
