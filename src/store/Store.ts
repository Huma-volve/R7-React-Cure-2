import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserSlice"
import doctorReducer from "./doctorSlice"
import authReducer from './UserSlice';
import profileReducer from './profileSlice';
import MethodsReducer from './MethodsSlice';
export const store = configureStore({

    reducer: {
        user: userReducer,
        doctor: doctorReducer,
        auth: authReducer,
        profile: profileReducer,
        methods: MethodsReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
