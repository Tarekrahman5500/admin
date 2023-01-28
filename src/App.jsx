import React, {useEffect} from 'react'
import './App.css'
import {Navigate, Route, Routes, useLocation,} from "react-router-dom";
import Home from "./containers/home/home.jsx";
import Signin from "./containers/signin/signin.jsx";
import Signup from "./containers/signup/signup.jsx";
import NotFound from "./compoents/NotFound/NotFound/NotFound.jsx";
import PrivateRoute from "./compoents/hoc/privateRoute.jsx";
import {useDispatch, useSelector} from "react-redux";
import {isUserLoggedIn} from "./actions/authAction.js";
import Products from "./compoents/products/products.jsx";
import Orders from "./compoents/orders/orders.jsx";


function App() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const master =auth.user.role

    const check = master === import.meta.env.VITE_REACT_APP_ADMIN_NAME
    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn())
        }
    }, [])
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/orders" element={<Orders/>}/>
            </Route>

            <Route path="/signup" element={ (check && auth.authenticate) ?<Signup/> : <Navigate to={`/home`}/>}/>
            <Route path="/signin" element={auth.authenticate ? <Navigate to={`/home`}/> : <Signin/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )

}


export default App
