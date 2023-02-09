import React from "react";
import { Helmet } from "react-helmet";
import "../components/css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
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
                    <h1>i am home</h1>
                    <Link to={"/registration"}>Login / Sign up</Link>
                </div>
            </section>
        </>
    );
};

export default Home;
