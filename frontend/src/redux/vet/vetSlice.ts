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
  isEditing: boolean;
  editedVet: any;
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
const initialSelectService: string[] =[];

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
  isLoading: false,
  error: null,
  bookings: initialService,
  isEditing: false,
  isChecked: true,
  editedVet: null,
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
    setVet: (state, action: PayloadAction<Vet>) => {
      state.vet = action.payload;
    },
    setBookings: (state, action: PayloadAction<Service[]>) => {
      state.bookings = action.payload;
    },
    setIsChecked: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
    setVetIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setEditedVet: (state, action: PayloadAction<any>) => {
      state.editedVet = action.payload;
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
  },
  extraReducers: (builder) => {
    //getVetData
    builder.addCase(getVetData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getVetData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vet = action.payload;
      state.editedVet = action.payload;
    });
    builder.addCase(getVetData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(notifyVet.fulfilled, (state, action) => {
      state.vet = action.payload;
    });

    //getServiceBookingData
    builder.addCase(getServiceBookingData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getServiceBookingData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload;
    });
    builder.addCase(getServiceBookingData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const {
  setVet,
  setBookings,
  setVetIsEditing,
  setIsChecked,
  setEditedVet,
  setActiveVetTab,
  setBookingImages,
  setVetDataForm,
  setVetImageFile,
  setVetShowPassword,
  setVetPasswordError,
  setSelectServices,
  setVetServiceError,
  
} = vetSlice.actions;

export default vetSlice.reducer;
