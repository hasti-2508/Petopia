import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPets = createAsyncThunk("getPets", async (currentPage: number) => {
    try {
      const response = await axiosInstance.get(`/pet?page=${currentPage}`);
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  });

  export const getOwner = createAsyncThunk("getOwner", async (ownerId: string) => {
    try {
      const response = await axiosInstance.get(`/user/${ownerId}`);
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  });


  export const getPetDetails = createAsyncThunk("getPetDetails", async (id: string) => {
    try{
        const response = await axiosInstance.get(`/pet/${id}`);
        return response.data;
    }catch(error){
        throw new Error(error.response.data.message);
    }
  })

  export const setAdopted = createAsyncThunk("setAdopted", async (id: string) => {
    try{
        const response = await axiosInstance.post(`/user/${id}/adopt`);
        return response.data;
    }catch(error){
        throw new Error(error.response.data.message);
    }
  })

  