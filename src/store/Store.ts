import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserSlice"
import doctorReducer from "./doctorSlice"
import authReducer from './UserSlice';
import profileReducer from './profileSlice';
export const store = configureStore({

    reducer: {
        user: userReducer,
        doctor: doctorReducer,
        auth: authReducer,
        profile: profileReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
