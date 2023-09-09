import { createAsyncThunk } from "@reduxjs/toolkit";
import { SingInForm } from "../types/sign-in-form.type";
import repository from "../../../repository";
import { SignInDto } from "../types/sign-in-dto.type";

export const signIn = createAsyncThunk<SignInDto, SingInForm>(
  `post/sign-in`,
  async (SignInForm, { rejectWithValue }) => {
    try {
      const response = await repository.post("auth/sign-in", SignInForm);
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
