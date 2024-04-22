import { TrainerData } from "@/interfaces/trainer";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTrainerData = createAsyncThunk("getTrainerData", async () => {
  try {
    const res = await axiosInstance.get("/currentUser");
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
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
