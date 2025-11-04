import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserSlice"
import doctorReducer from "./doctorSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
         doctor: doctorReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;