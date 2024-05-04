import { Vet } from "@/interfaces/vet";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getServiceBookingData, getVetData, notifyVet } from "./vetService";
import { Service } from "@/interfaces/service";

interface VetState {
  vet: Vet;
  isLoading: boolean;
  error: any;
  bookings: Service[];
  isChecked: boolean;
  bookingImages: string[];
  activeVetTab: string;
  vetDataForm: Vet;
  vetImageFile: File;
  selectServices: string[];
  vetShowPassword: boolean;
  vetServiceError: string;
  vetPasswordError: string;
}

const initialVet: Vet = null;
const initialService: Service[] = [];
const initialSelectService: string[] = [];

const initialVetDataForm = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  YearsOfExperience: 0,
  services: [],
  _id: "",
  imageUrl: "",
  bookings: [],
};

const initialState: VetState = {
  vet: initialVet,
  isLoading: true,
  error: null,
  bookings: initialService,
  isChecked: true,
  bookingImages: [],
  activeVetTab: "Profile",
  vetDataForm: initialVetDataForm,
  vetImageFile: null,
  selectServices: initialSelectService,
  vetShowPassword: false,
  vetServiceError: "",
  vetPasswordError: "",
};

const vetSlice = createSlice({
  name: "vet",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Service[]>) => {
      state.bookings = action.payload;
    },
    setIsChecked: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
    setBookingImages: (state, action: PayloadAction<string[]>) => {
      state.bookingImages = action.payload;
    },
    setActiveVetTab: (state, action: PayloadAction<string>) => {
      state.activeVetTab = action.payload;
    },
    setVetDataForm: (
      state,
      action: PayloadAction<Partial<VetState["vetDataForm"]>>
    ) => {
      state.vetDataForm = { ...state.vetDataForm, ...action.payload };
    },
    setVetImageFile: (state, action: PayloadAction<File>) => {
      state.vetImageFile = action.payload;
    },
    setVetShowPassword: (state, action: PayloadAction<boolean>) => {
      state.vetShowPassword = action.payload;
    },
    setVetPasswordError: (state, action: PayloadAction<string>) => {
      state.vetPasswordError = action.payload;
    },
    setSelectServices: (state, action: PayloadAction<string[]>) => {
      state.selectServices = action.payload;
    },
    setVetServiceError: (state, action: PayloadAction<string>) => {
      state.vetServiceError = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVetData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vet = action. payload;
    });
    builder.addCase(notifyVet.fulfilled, (state, action) => {
      state.vet = action.payload;
    });
    builder.addCase(getServiceBookingData.pending, (state) => {
      state.isLoading = true;

      state.error = null;
    });
    builder.addCase(getServiceBookingData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getServiceBookingData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const {
  setBookings,
  setIsChecked,
  setActiveVetTab,
  setBookingImages,
  setVetDataForm,
  setVetImageFile,
  setVetShowPassword,
  setVetPasswordError,
  setSelectServices,
  setVetServiceError,
  setIsLoading,
} = vetSlice.actions;

export default vetSlice.reducer;
