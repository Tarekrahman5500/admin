import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../actions/authAction.js";

const Header = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signOut());
    };

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">
                        Signup
                    </NavLink>
                </li>
            </Nav>
        );
    };

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">
                        Signin
                    </NavLink>
                </li>

            </Nav>
        );
    };
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
                <Container fluid>
                    {/*  <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>*/}
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
};

export default Header;