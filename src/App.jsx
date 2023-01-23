import React from 'react'
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./containers/home/home.jsx";
import Signin from "./containers/signin/signin.jsx";
import Signup from "./containers/signup/signup.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        /*  children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "about",
              element: <About />,
            },
          ],*/
    },
    {
        path: "/signin",
        element: <Signin/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },

]);

function App() {

    return (
        <RouterProvider
            router={router}
            /*// this will render instead of `element`
             errorElement={<ErrorBoundary />}*/
        />
    )

}


export default App
