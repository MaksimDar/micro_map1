import React from "react";
import { useValue } from "../context/ContextProvider";
import Login from "./user/Login";
import UserMenu from "./user/UserMenu";
import MapWithGeocoder from "../map/Map";

const MainComponent = () => {
    const { state: { currentUser, openLogin } } = useValue();

    return (
        <>
            {openLogin && <Login />}
            <UserMenu />

            {currentUser && <MapWithGeocoder />}
        </>
    );
};

export default MainComponent;