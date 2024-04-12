import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
  role: string;
}

interface ForgetPasswordData {
    email: string;
    role: string;
  }

export const login = createAsyncThunk(
  "login",
  async (formData: LoginFormData,{rejectWithValue}) => {
    try {
      const response = await axios.post(`${process.env.HOST}/login`, formData);
      const data = response.data;
      localStorage.setItem("jwt", data.token);
      document.cookie = `jwt=${data.token}; path=/`;
      return data;
    } catch (error) {
    if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);


export const forgetPassword = createAsyncThunk(
    "forgetPassword",
    async (forgetPasswordData: ForgetPasswordData,{rejectWithValue}) => {
      try {
        const response = await axiosInstance.post("/forgetPassword", forgetPasswordData);
        const data = response.data;
        return data;
      } catch (error) {
      if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  );
  

export const currentUser = createAsyncThunk(
    "currentUser",
    async () => {
      try {
        const response = await axiosInstance.get("/currentUser");
        const data = response.data;
        return data;
      } catch (error) {
        throw new Error(error.response.data.message)
    }
    }
  );


export const logout = createAsyncThunk("logout", async () => {
  try{
    const response = await axiosInstance.post("/logout");
    return response.data;
  }
  catch(error){
    throw new Error(error.response.data.message)
  }
})



