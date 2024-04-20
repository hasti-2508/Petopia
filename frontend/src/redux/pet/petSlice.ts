import { Pet } from "@/interfaces/pet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOwner, getPetDetails, getPets } from "./petService";


interface PetState {
  petData: Pet[];
  originalPetData: Pet[];
  currentPage: number;
  searchTerm: string;
  loading: boolean;
  owner: any;
  petDetails: Pet;
}

const initialState: PetState = {
  petData: [],
  originalPetData: [],
  currentPage: 1,
  searchTerm: "",
  loading: true,
  owner: null,
  petDetails: null,
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setPetData: (state, action: PayloadAction<Pet[]>) => {
      state.petData = action.payload;
    },
    setOriginalPetData: (state, action: PayloadAction<Pet[]>) => {
      state.originalPetData = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPetDetails: (state, action: PayloadAction<Pet>) => {
      state.petDetails = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPets.fulfilled, (state, action) => {
      //  state.petData = action.payload;
      state.originalPetData = action.payload;
    });

    builder.addCase(getOwner.fulfilled, (state, action) => {
      //  state.petData = action.payload;
      state.owner = action.payload;
    });

    builder.addCase(getPetDetails.fulfilled, (state, action) => {
      state.petDetails = action.payload;
    });
  },
});

export const {
  setPetData,
  setOriginalPetData,
  setCurrentPage,
  setSearchTerm,
  setLoading,
  setPetDetails
} = petSlice.actions;

export default petSlice.reducer;
