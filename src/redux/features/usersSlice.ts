import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    termsAndConditions: "",
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPassword2: (state, action) => {
            state.password2 = action.payload;
        },
        setTermsAndConditions: (state, action) => {
            state.termsAndConditions = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setPassword2,
    setTermsAndConditions,
    setLoading,
    setError,
} = slice.actions;
export default slice.reducer;
