
import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "./auth/authSlice";
import userReducer from "./user/userSlice";
import vetReducer from "./vet/vetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    vet: vetReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


