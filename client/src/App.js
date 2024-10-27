import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/user/Login';
import Notification from './components/Notification';
import Loading from './components/Loading';
import MapWithGeocoder from './map/Map';

const App = () => {
    return (
        <>
            <Loading />
            <Notification />
            <Login />
            <NavBar />
            <MapWithGeocoder />
        </>
    );
}

export default App;