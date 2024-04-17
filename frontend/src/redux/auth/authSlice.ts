
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentUser, forgetPassword, login } from "./authService";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: any;
  formData: {
    email: string;
    password: string;
  };
  showPassword: boolean;
  forgetPasswordData : {
    email: string;
    role: string;
  };
  userRole: string;
  imageUrl: string;
}
const initialFormData = {
    email: "",
    password: "",
  };

const initialForgetPasswordData = {
    email: "",
    role: "",
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
  formData: initialFormData,
  showPassword: false,
  forgetPasswordData: initialForgetPasswordData,
  userRole: null,
  imageUrl: "",
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Partial<AuthState["formData"]>>) => {
            state.formData = { ...state.formData, ...action.payload };
          },
        setShowPassword: (state, action: PayloadAction<boolean>) => {
            state.showPassword = action.payload;

          },
        setForgetPasswordData:(state,action:PayloadAction<Partial<AuthState["forgetPasswordData"]>>) => {
            state.forgetPasswordData = {...state.forgetPasswordData, ...action.payload}
        },
        setToken: (state, action:PayloadAction<string>) => {
             state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        //login
      builder.addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      });
      builder.addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

      //forgetPassword
      builder.addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(forgetPassword.fulfilled, (state) => {
        state.isLoading = false;
      });
      builder.addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

      //currentUser
      builder.addCase(currentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      });
      builder.addCase(currentUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.userRole = action.payload.role;
        state.imageUrl = action.payload.imageUrl;
      });
      builder.addCase(currentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });

    },
  });

  export const {
    setFormData,
    setShowPassword,
    setForgetPasswordData,
    setToken
  } = authSlice.actions;
export default authSlice.reducer;


