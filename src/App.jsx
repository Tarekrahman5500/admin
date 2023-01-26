import React from 'react'
import './App.css'
import {
    createBrowserRouter, Outlet, Route,
    RouterProvider, Routes,
} from "react-router-dom";
import Home from "./containers/home/home.jsx";
import Signin from "./containers/signin/signin.jsx";
import Signup from "./containers/signup/signup.jsx";
import NotFound from "./compoents/NotFound/NotFound/NotFound.jsx";
import PrivateRoute from "./compoents/hoc/privateRoute.jsx";
import {useSelector} from "react-redux";


function App() {
    const auth = useSelector(state => state.auth)

    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
            </Route>

            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={auth.authenticate ? <Home/> : <Signin/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )

}


export default App
