import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import {
//     setGearOpen,
//     setNavVisible,
//     setSideBarVisible,
// } from "../redux/reducers/eventsSlice";

const Layout: React.FC = () => {
    const [showContent, setShowContent] = useState(false);
    const location: any = useLocation();
    const [key, setKey] = useState(0);

    // const dispatch = useDispatch();
    // const handleOutlet = () => {
    //     dispatch(setNavVisible(false));
    //     dispatch(setGearOpen(false));
    //     dispatch(setSideBarVisible(false));
    // };

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 2000);
    }, []);

    useEffect(() => {
        setKey(location.key);
    }, [location]);
    return (
        <>
            {/* <LandingPage /> */}
            {/* <SideNav /> */}
            {/* <ThemesGear /> */}
            {/* <BlogDetailSidebar /> */}
            {/* <ThemeWrapper key={key}>
                    </ThemeWrapper> */}
            <div>
                <Outlet key={key} />
            </div>
        </>
    );
};
export default Layout;
