import React from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    solid,
    regular,
    brands,
    icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import "../components/css/home.css";
import { faCoffee, faUserSecret } from "@fortawesome/free-solid-svg-icons";

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
                    <FontAwesomeIcon
                        icon={faUserSecret}
                        className="fas fa-spin"
                        size="xs"
                        // size="lg"
                        // size="2x"
                        // flip="vertical"
                        rotation={90}
                    />
                </div>
            </section>
        </>
    );
};

export default Home;
