import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { selectAuth } from '../Reducers/auth';
import { logout } from '../Actions/auth';

const BORDER_RADIUS = 3;

const NavbarContainer = styled(Navbar)`
    border-bottom: 0;
`;

const NavbarBrand = styled(Button)`
    border: ${BORDER_RADIUS}px solid black;
    font-size: 1rem;
    border-radius: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: white;
    color: black;
`;

const NavlinkContainer = styled(Nav.Link)`
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 15px !important; 
    
`;


function Header() {
    const { user } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log(user);

    const handleLogout = () => {
        dispatch(logout());
    }

    const renderLoggedIn = (
        <Form inline>
            <Button variant="light" onClick={handleLogout}>Log out</Button>
        </Form>
    )

    const renderLoggedOut = (
        <Form inline>
            <Button variant="light" href="/register">Register</Button>
            <Link to={{
                pathname: "/login",
                state: { from: location.pathname }
            }}>
                <Button variant="light" >Login</Button>
            </Link>
        </Form>
    )
    return (
        <NavbarContainer className="text-align-center" bg="light" expand="lg" sticky="top">
            <NavbarBrand variant="dark" href="/">Color Palettes</NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto mr-auto">
                    <NavlinkContainer href="/palettes">Palettes</NavlinkContainer>
                    <NavlinkContainer href="/build">Build</NavlinkContainer>
                    <NavlinkContainer href="/gallery">Gallery</NavlinkContainer>
                    {user && <NavlinkContainer href="/profile">My page</NavlinkContainer>}
                </Nav>
                {user ? renderLoggedIn : renderLoggedOut}
            </Navbar.Collapse>
        </NavbarContainer>
    );
}

export default Header;
