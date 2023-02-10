import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    termsAndConditions: "",
    providerName: "",
    accessToken: null,
    refreshToken: null,
    loggedIn: false,
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
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
        setProviderName: (state, action) => {
            state.providerName = action.payload;
            switch (action.payload) {
                case "google":
                    state.password = "google";
                    state.password2 = "google";
                    break;
                case "twitter":
                    state.password = "twitter";
                    state.password2 = "twitter";
                    break;
                default:
                    state.password = "";
                    state.password2 = "";
                    break;
            }
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.access_token;
        },
        // we can pass null to it from ui components to unset the token state
        // and show/hide,enable/disable routes accordingly
        unsetAccessToken: (state, action) => {
            state.accessToken = action.payload.access_token;
            // state.accessToken = action.payload.access_token;
        },

        setLoggedIn: (state, action) => {
            state.isLoading = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetUserFields: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const {
    setId,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setPassword2,
    setTermsAndConditions,
    setProviderName,
    setAccessToken,
    unsetAccessToken,
    setLoggedIn,
    setLoading,
    setError,
    resetUserFields,
} = slice.actions;
export default slice.reducer;
