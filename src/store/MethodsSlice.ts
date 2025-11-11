import { getMethods, addMethods } from "@/services/paymentMethod/Methods";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaymentMethod {
    methodName: string;
    providerToken: string;
    last3: string;
    brand: string;
    expMonth: number;
    expYear: number;
}

interface PaymentMethodsState {
    data: PaymentMethod[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentMethodsState = {
    data: [],
    loading: false,
    error: null,
};

const methodsSlice = createSlice({
    name: "methods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ✅ Get Methods
        builder
            .addCase(getMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMethods.fulfilled, (state, action: PayloadAction<PaymentMethod[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to fetch payment methods";
            });

        builder
            .addCase(addMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMethods.fulfilled, (state, action: PayloadAction<PaymentMethod[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to add payment method";
            });
    },
});

export default methodsSlice.reducer;
export type { PaymentMethod };
