import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./auth.actions";

const initialState = {
  pending: false,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.pending = true;
        state.errors = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.pending = false;
        state.errors = null;
      })
      .addCase(signIn.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload.message;
      });
  },
});

export default authSlice.reducer;
