import { createSlice }
from "@reduxjs/toolkit";

import type { PayloadAction }
from "@reduxjs/toolkit";

import type { User }
from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      state.user =
        action.payload.user;

      state.token =
        action.payload.token;

      localStorage.setItem(
        "token",
        action.payload.token
      );
    },

    logout: (state) => {
      state.user = null;

      state.token = null;

      localStorage.removeItem(
        "token"
      );
    },
  },
});

export const {
  loginSuccess,
  logout,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;