import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./UserRegistr"
const store = configureStore({
    reducer: {
        user: userReducer
    },
});
export default store