import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserSlice"
import doctorReducer from "./doctorSlice"
import authReducer from './UserSlice';
import reviewReducer from './reviewSlice'; 
import locationReducer from './locationSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({

    reducer: {
        user: userReducer,
        doctor: doctorReducer,
        auth: authReducer,
        review: reviewReducer,
        location: locationReducer,
        notifications: notificationsReducer,


    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
