import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../components/css/home.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getToken, removeToken } from "../redux/services/localStorageService";
import { useDispatch } from "react-redux";
import { useGetLoggedUserQuery } from "../redux/services/userAuthApi";
// import { setUserInfo, unSetUserInfo } from "../redux/features/userSlice";
import {
    setEmail,
    setFirstName,
    setId,
    setLastName,
} from "../redux/features/authSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // this hook gives data and some other features, this access_token will goto userAuthApi and we get response
    // data of server in our "data" property in hook, then we use "data" wherever in ui's.
    const { access_token, refresh_token } = getToken();

    console.log(`Bearer ${access_token}`);

    const { data, isSuccess } = useGetLoggedUserQuery<any>({
        access_token: access_token,
        refresh_token: refresh_token,
    });
    console.log("My user data", data);

    const { firstName, lastName, email, id, loggedIn } = useSelector(
        (state: RootState) => state.auth
    );

    // storing user profile data in state
    useEffect(() => {
        if (data && isSuccess) {
            dispatch(setId(data.id));
            dispatch(setFirstName(data.first_name));
            dispatch(setLastName(data.last_name));
            dispatch(setEmail(data.email));
        }
    }, [data, isSuccess, dispatch]);

    // on logout, unset data in store,unset token in store.remove token from browser
    const handleLogout = () => {
        // dispatch(unSetUserInfo());
        removeToken();
        // navigate("/login");
    };
    return (
        <>
            <Helmet>
                <title>
                    Qandeel Khan - Full Stack Developer | Python, Django, React
                </title>
                <meta
                    name="description"
                    content="Welcome to the portfolio of Qandeel Khan, a Full Stack Developer specializing in Python, Django, and React. Browse his projects, skills, and experience."
                />
                <meta
                    name="keywords"
                    content="Qandeel Khan, Full Stack Developer, Python, Django, React, Portfolio, Projects, Skills, Experience"
                />
                <meta name="author" content="Qandeel Khan" />
                <meta name="robots" content="index,follow" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Helmet>
            <section id="home">
                <div className="home-container">
                    <h1>
                        i am home {firstName} {lastName}
                    </h1>
                    {id ? (
                        <div>
                            <button onClick={handleLogout}>LogOut</button>
                        </div>
                    ) : (
                        <>
                            <Link to={"/registration"}>Sign Up</Link>
                            <br />
                            <Link to={"/login"}>Login</Link>
                            {console.log(loggedIn)}
                            {console.log(data)}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
