import { TrainerData } from "@/interfaces/trainer";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTrainerData = createAsyncThunk("getTrainerData", async (_,thunkAPI) => {
  try {
    const res = await axiosInstance.get("/currentUser");
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const errorMessage = error.response.data.message || 'You are not authorized to access this resource.';
      return thunkAPI.rejectWithValue({ status: 403, message: errorMessage });
    } else {
      throw new Error(error.response?.data?.message || 'An error occurred while fetching user data.');
    }
  }
});

export const getTrainingBookingData = createAsyncThunk(
  "getTrainingBookingData",
  async (bookingId: string) => {
    try {
      const response = await axiosInstance.get(
        `/trainingBooking/booking/${bookingId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const setTrainingComplete = createAsyncThunk(
  "setTrainingComplete",
  async ({
    bookingId,
    isComplete,
  }: {
    bookingId: string;
    isComplete: boolean;
  }) => {
    try {
      const response = await axiosInstance.patch(
        `/trainingBooking/${bookingId}/complete`,
        { isComplete }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const trainerRegister = createAsyncThunk(
  "trainerRegister",
  async (reqData: TrainerData) => {
    try {
      const response = await axiosInstance.post("/trainer/register", reqData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
