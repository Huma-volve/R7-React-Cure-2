import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import authReducer from './UserSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
