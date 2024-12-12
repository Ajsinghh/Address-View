import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './profile/profileSlice';

const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
});

export default store;