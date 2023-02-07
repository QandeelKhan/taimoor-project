import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setUserToken, unSetUserToken } from "../features/authSlice";
import {
    getToken,
    removeAccessToken,
    removeToken,
    storeAccessToken,
    storeToken,
} from "./localStorageService";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/user/",
    prepareHeaders: (headers, { getState }) => {
        let { access_token } = getToken();
        if (access_token) {
            headers.set("authorization", `Bearer ${access_token}`);
        }
        return headers;
    },
});

let { refresh_token } = getToken();
console.log("this is refresh token", refresh_token);
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const body = { refresh: refresh_token };
        console.log("body of refresh token", body);
        // try to get a new token
        const refreshResult: any = await baseQuery(
            {
                url: "token/refresh/",
                method: "POST",
                body: body,
            },
            api,
            extraOptions
        );
        if (refreshResult.data) {
            console.log("-----------refresh results", refreshResult.data);
            // store the new token

            // storeToken(refreshResult.data.access);
            let { access: access_token } = refreshResult.data;

            console.log("---------------new access token ", access_token);
            api.dispatch(setUserToken({ access_token: access_token }));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
            const storeObj = { access: access_token, refresh: refresh_token };
            storeToken(storeObj);
        } else {
            api.dispatch(unSetUserToken({ access_token: null }));
        }
    }
    return result;
};
export const userAuthApiExtended = createApi({
    // reducerPath: can determine where to store cache in our redux store and by which name.
    reducerPath: "userAuthApiExtended",
    baseQuery: baseQueryWithReauth,
    //     // endpoints:receives a call back func, normally passed parameter as builder(abc/anything),in which we
    //     // write actions/operations functions i/e registerUser
    endpoints: () => ({}),
});
