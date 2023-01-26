import React from 'react';
import {Navigate, Outlet, Route, useLocation} from "react-router-dom";

const PrivateRoute = () => {
    let location = useLocation();

    const token = window.localStorage.getItem('token');
    return token ? <Outlet/> : <Navigate to="/signin"/>;

}


export default PrivateRoute;