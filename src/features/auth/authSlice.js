// src/redux/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "./authAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export const currentProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const user = await fetchProfile();
  return user;
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    // Logout action
    logout: (state) => {
      state.profile = null;
      state.error = null;
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all profiles
      //   .addCase(fetchProfiles.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //   })
      //   .addCase(fetchProfiles.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.profiles = action.payload.profiles;
      //   })
      //   .addCase(fetchProfiles.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = action.payload || action.error.message;
      //   })

      // Fetch single profile
      .addCase(currentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(currentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { loginFailure, logout } = profileSlice.actions;
export default profileSlice.reducer;
