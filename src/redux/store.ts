import eventsReducer from "./reducers/eventsSlice";
import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
// name our authSlice.ts as authReducer

import { userAuthApi } from "./services/userAuthApi";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import usersReducer from "./features/usersSlice";
// ...

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        // Add the generated reducer as a specific top-level slice
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        // our created reducers, now we set a state from it in userLogin because whenever user
        // login the process will start by setting our generated token as state in our app
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAuthApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
