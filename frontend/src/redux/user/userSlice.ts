import { Pet, PetDto } from "@/interfaces/pet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getServiceData, getTrainingData, petAdd, userAdd } from "./userService";
import { User, UserData } from "@/interfaces/user";
import { Service } from "@/interfaces/service";
import { Training } from "@/interfaces/training";
import { getTrainingBookingData } from "../trainer/trainerService";


interface UserState {
  isLoading: boolean;
  error: any;
  petDataForm: PetDto;
  imageFile: File;
  userDataForm: UserData;
  showPassword: boolean;
  passwordError: string;
  userImageFile: File;
  user: User;
  pets: Pet[];
  service: Service[];
  training: Training[];
  rate: number;
  serviceId: string;
  trainingId: string;
  activeTab: string;
  loading: boolean;
  serviceImages: string[];
  trainingImages: string[];
  isEditing: boolean;
  editedUser: any;
}

const initialPetDataForm = {
  pet_name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  color: "",
  weight: "",
  health_conditions: "",
  allergies: "",
  additional_notes: "",
  imageUrl: "",
  isAdopted: false,
};

const initialUserDataForm = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  imageUrl: "",
  pets: [],
};
const initialUser: User = null;
const initialPets: Pet[] = [];
const initialService: Service[] = [];
const initialTraining: Training[] = [];

const initialState: UserState = {
  isLoading: false,
  error: null,
  petDataForm: initialPetDataForm,
  imageFile: null,
  userDataForm: initialUserDataForm,
  showPassword: false,
  passwordError: "",
  userImageFile: null,
  user: initialUser,
  pets: initialPets,
  service: initialService,
  training: initialTraining,
  rate: null,
  serviceId: "",
  trainingId: "",
  activeTab: "Profile",
  loading: true,
  serviceImages: [],
  trainingImages: [],
  isEditing: false,
  editedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPetDataForm: (
      state,
      action: PayloadAction<Partial<UserState["petDataForm"]>>
    ) => {
      state.petDataForm = { ...state.petDataForm, ...action.payload };
    },
    setImageFile: (state, action: PayloadAction<File>) => {
      state.imageFile = action.payload;
    },
    setUserDataForm: (
      state,
      action: PayloadAction<Partial<UserState["userDataForm"]>>
    ) => {
      state.userDataForm = { ...state.userDataForm, ...action.payload };
    },
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
    setPasswordError: (state, action: PayloadAction<string>) => {
      state.passwordError = action.payload;
    },
    setUserImageFile: (state, action: PayloadAction<File>) => {
      state.userImageFile = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
    },
    setService: (state, action: PayloadAction<Service[]>) => {
      state.service = action.payload;
    },
    setTraining: (state, action: PayloadAction<Training[]>) => {
      state.training = action.payload;
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.rate = action.payload;
    },
    setServiceId: (state, action: PayloadAction<string>) => {
      state.serviceId = action.payload;
    },
    setTrainingId: (state, action: PayloadAction<string>) => {
      state.trainingId = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setServiceImages: (state, action: PayloadAction<string[]>) => {
      state.serviceImages = action.payload;
    },
    setTrainingImages: (state, action: PayloadAction<string[]>) => {
      state.trainingImages = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setEditedUser: (state, action: PayloadAction<any>) => {
      state.editedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
   
    builder.addCase(petAdd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.petDataForm = action.payload;
    });
    builder.addCase(userAdd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.petDataForm = action.payload;
    });
    builder.addCase(getServiceData.fulfilled, (state, action) => {
      state.service = action.payload;
    });
    builder.addCase(getTrainingData.fulfilled, (state, action) => {
      state.training = action.payload;
    });

  },
});

export const {
  setPetDataForm,
  setImageFile,
  setUserDataForm,
  setShowPassword,
  setPasswordError,
  setUserImageFile,
  setUser,
  setPets,
  setService,
  setTraining,
  setActiveTab,
  setLoading,
  setServiceImages,
  setTrainingImages,
  setIsEditing,
  setEditedUser,
  setRate,
  setServiceId,
  setTrainingId,
} = userSlice.actions;

export default userSlice.reducer;
