import { PetDto } from "@/interfaces/pet";
import { UserData } from "@/interfaces/user";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const petAdd = createAsyncThunk(
  "petAdd",
  async (petDataForm: PetDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/pet/", petDataForm);
      const data = response.data;
      return data;
    } catch (error) {
      if (error.message && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userAdd = createAsyncThunk(
  "userAdd",
  async (UserDataForm: UserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", UserDataForm);
      const data = response.data;
      return data;
    } catch (error) {
      if (error.message && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserData = createAsyncThunk("getUserData", async (_, thunkAPI) => {
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

export const getPetsData = createAsyncThunk(
  "getPetsData",
  async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getServiceData = createAsyncThunk(
  "getServiceData",
  async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `/serviceBooking/user/${userId}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getTrainingData = createAsyncThunk(
  "getTrainingData",
  async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `/trainingBooking/user/${userId}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const serviceRating = createAsyncThunk(
  "serviceRating",
  async ({
    servicePlanId,
    rating,
  }: {
    servicePlanId: string;
    rating: number;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/serviceBooking/${servicePlanId}/rate`,
        { rating }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const trainingRating = createAsyncThunk(
  "trainingRating",
  async ({
    trainingPlanId,
    rating,
  }: {
    trainingPlanId: string;
    rating: number;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/trainingBooking/${trainingPlanId}/rate`,
        { rating }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userUpdate = createAsyncThunk(
  "userUpdate'",
  async ({ userId, editedUser }: { userId: string; editedUser: any }) => {
    try {
      const response = await axiosInstance.patch(`user/update/${userId}`, {
        editedUser,
      });
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const petAdoption = createAsyncThunk(
  "petAdoption",
  async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/pet/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
