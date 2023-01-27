import React from 'react';

import Header from "../Header/index.jsx";
import Container from "react-bootstrap/Container";

const Layout = (props) => {
    return (
        <>
           <Header/>
                {props.children}

        </>
    );
};

export default Layout;