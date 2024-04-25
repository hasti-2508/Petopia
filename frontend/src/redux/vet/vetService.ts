import { VetData } from "@/interfaces/vet";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getVetData = createAsyncThunk("getVetData", async (_,thunkAPI) => {
  try {
    const response = await axiosInstance.get("/currentUser");
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const errorMessage = error.response.data.message || 'You are not authorized to access this resource.';
      return thunkAPI.rejectWithValue({ status: 403, message: errorMessage });
    } else {
      throw new Error(error.response?.data?.message || 'An error occurred while fetching user data.');
    }
  }
});

export const getServiceBookingData = createAsyncThunk(
  "getServiceBookingData",
  async (bookingId: string) => {
    try {
      const response = await axiosInstance.get(
        `/serviceBooking/booking/${bookingId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const vetUpdate = createAsyncThunk(
  "vetUpdate",
  async ({ editedVet, vetId }: { editedVet: any; vetId: string }) => {
    try {
      const response = await axiosInstance.patch(`vet/update/${vetId}`, {
        editedVet,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const setBookingComplete = createAsyncThunk(
  "setBookingComplete",
  async ({
    bookingId,
    isComplete,
  }: {
    bookingId: string;
    isComplete: boolean;
  }) => {
    try {
      const response = await axiosInstance.patch(
        `/serviceBooking/${bookingId}/complete`,
        { isComplete }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const setAvailable = createAsyncThunk(
  "setAvailable",
  async (vetId: string) => {
    try {
      const response = await axiosInstance.patch(`/vet/${vetId}/available`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const notifyVet = createAsyncThunk(
  "notifyVet",
  async (vetId: string) => {
    try {
      const response = await axiosInstance.patch(`/vet/${vetId}/notify`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const vetRegister = createAsyncThunk(
  "vetRegister",
  async (reqData: VetData) => {
    try {
      const response = await axiosInstance.post("/vet/register", reqData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
