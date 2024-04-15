import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Trainer } from "@/interfaces/trainer";
import { Training } from "@/interfaces/training";
import { getTrainerData, getTrainingBookingData } from "./trainerService";

interface TrainerState {
  trainer: Trainer;
  trainings: Training[];
  trainingImages: string[];
  activeTrainerTab: string;
  trainerDataForm: Trainer;
  selectTrainings: string[];
  trainerShowPassword: boolean;
  trainerTrainingError: string;
  trainerPasswordError: string;
  trainerImageFile: File;
}

const initialTrainer: Trainer = null;
const initialTraining: Training[] = [];
const initialSelectTraining: string[] = [];

const initialTrainerDataForm = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  YearsOfExperience: 0,
  NumberOfPetsTrained: 0,
  trainings: [],
  _id: "",
  imageUrl: "",
  OnGoingTraining: [],
  bookings: [],
};

const initialState: TrainerState = {
  trainer: initialTrainer,
  trainings: initialTraining,
  trainingImages: [],
  activeTrainerTab: "Profile",
  trainerDataForm: initialTrainerDataForm,
  selectTrainings: initialSelectTraining,
  trainerShowPassword: false,
  trainerTrainingError: "",
  trainerPasswordError: "",
  trainerImageFile: null,
};

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    setTrainings: (state, action: PayloadAction<Training[]>) => {
      state.trainings = action.payload;
    },
    setTrainingsImages: (state, action: PayloadAction<string[]>) => {
      state.trainingImages = action.payload;
    },
    setActiveTrainerTab: (state, action: PayloadAction<string>) => {
      state.activeTrainerTab = action.payload;
    },
    setTrainerDataForm: (
      state,
      action: PayloadAction<Partial<TrainerState["trainerDataForm"]>>
    ) => {
      state.trainerDataForm = { ...state.trainerDataForm, ...action.payload };
    },
    setTrainerImageFile: (state, action: PayloadAction<File>) => {
      state.trainerImageFile = action.payload;
    },
    setTrainerShowPassword: (state, action: PayloadAction<boolean>) => {
      state.trainerShowPassword = action.payload;
    },
    setTrainerPasswordError: (state, action: PayloadAction<string>) => {
      state.trainerPasswordError = action.payload;
    },
    setSelectTrainings: (state, action: PayloadAction<string[]>) => {
      state.selectTrainings = action.payload;
    },
    setTrainerTrainingError: (state, action: PayloadAction<string>) => {
      state.trainerTrainingError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTrainerData.fulfilled, (state, action) => {
      state.trainer = action.payload;
      // state.editedVet = action.payload;
    });
    builder.addCase(getTrainingBookingData.fulfilled, (state, action) => {
      state.trainings = action.payload;
      // state.editedVet = action.payload;
    });
  },
});

export const {
  setTrainings,
  setTrainingsImages,
  setActiveTrainerTab,
  setSelectTrainings,
  setTrainerShowPassword,
  setTrainerDataForm,
  setTrainerImageFile,
  setTrainerPasswordError,
  setTrainerTrainingError,
} = trainerSlice.actions;

export default trainerSlice.reducer;
