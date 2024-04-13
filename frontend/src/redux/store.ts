
import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "./auth/authSlice";
import userReducer from "./user/userSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


