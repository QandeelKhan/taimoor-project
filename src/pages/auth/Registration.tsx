import { BaseSyntheticEvent, useState } from "react";
// import {
//     TextField,
//     Button,
//     Box,
//     Checkbox,
//     FormControlLabel,
//     Typography,
//     Alert,
//     CssBaseline,
// } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/services/userAuthApi";
import { storeToken } from "../../redux/services/localStorageService";
import GoogleRegistration from "./GoogleRegistration";

// const serverErrorInterface = {
//     name: String,
//     email: String,
//     password: String,
//     password2: String,
//     tc: Boolean,
// };

const Registration = () => {
    // getting errors from server
    const [serverError, setServerError] = useState<any>({});
    const navigate = useNavigate();
    // the work of redux: with hook "userRegisterUserMutation" we get some extra awesome properties in an obj
    // i.e isLoading, isFetching, is error etc and get a method "registerUser" and we can call this method
    // to send our data, rather then hook..
    // const data = useRegisterUserMutation();
    // console.log(data);
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const handleSubmit = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // this email can be target by the "name" property of html/jsx element.
        const actualData = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            email: data.get("email"),
            password: data.get("password"),
            password2: data.get("password2"),
            tc: data.get("tc"),
        };

        // calling the "registerUser" by await and give it the data of frontend, this data will go to
        // the "userAuthApi" slice in the "user" obj we send to backend.
        // this res contain the response of server i.e error/success.
        const res: any = await registerUser(actualData);
        // console.log(res);
        // here we define if the response of the server is "data" or the "error"
        if (res.error) {
            // console.log(res.error.data.errors);
            // console.log(typeof res.error.data.errors);
            setServerError(res.error.data.errors);
        }
        if (res.data) {
            console.log(typeof res.data);
            console.log(res.data);
            storeToken(res.data.token);
            navigate("/dashboard");
        }
    };
    return (
        <>
            <form id="registration-form" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required
                    />
                    <label htmlFor="name">First Name</label>
                    {serverError.first_name && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "10px",
                            }}
                        >
                            {serverError.name[0]}
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        required
                    />
                    <label htmlFor="name">Last Name</label>
                    {serverError.last_name && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "10px",
                            }}
                        >
                            {serverError.name[0]}
                        </div>
                    )}
                </div>
                <div>
                    <input type="email" name="email" id="email" required />
                    <label htmlFor="email">Email Address</label>
                    {serverError.email && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "10px",
                            }}
                        >
                            {serverError.email[0]}
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    {serverError.password && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "10px",
                            }}
                        >
                            {serverError.password[0]}
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        required
                    />
                    <label htmlFor="password2">Confirm Password</label>
                    {serverError.password2 && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "10px",
                            }}
                        >
                            {serverError.password2[0]}
                        </div>
                    )}
                </div>
                <div>
                    <input type="checkbox" id="tc" name="tc" required />
                    <label htmlFor="tc">
                        I accept the terms and conditions
                    </label>
                    {serverError.tc && (
                        <div
                            style={{
                                color: "red",
                                fontSize: "12px",
                                paddingLeft: "10px",
                            }}
                        >
                            {serverError.tc[0]}
                        </div>
                    )}
                </div>
                <button type="submit">Submit</button>
            </form>
            <GoogleRegistration />
        </>
    );
};

export default Registration;
