import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { loginAccount } from "../pages/Auth/Signup/utils/apiFunctions";
import { useEffect } from "react";

const tkUser = localStorage.getItem("tk-user")
let baseURL = "https://api.dkawasaka.com/api/v1"


const initialState = {
    user: tkUser ? tkUser : null,
    error: false,
    success: false,
};

// User signed
export const login = createAsyncThunk(baseURL + "/login", async (user, thunkAPI) => {
    const data = await loginAccount(user);

    // Check for errors
    if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
        });
    },
  });
  
  export const { reset } = authSlice.actions;
  export default authSlice.reducer;