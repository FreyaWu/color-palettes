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
import {logout} from '../Actions/auth';

const BORDER_RADIUS = 3;

const NavbarContainer = styled(Navbar)`
    border-bottom: 0;
`;

const NavbarBrand = styled(Navbar.Brand)`
    border: ${BORDER_RADIUS}px solid black;
    border-radius: 25px;
    padding-left: 10px;
    padding-right: 10px;
`;

const NavlinkContainer = styled(Nav.Link)`
    border-bottom: ${BORDER_RADIUS}px solid black;
    padding-left: 2px;
    padding-right: 2px;
    font-size: 15px !important; 
`;

const SearchContainer = styled(FormControl)`
    border: ${BORDER_RADIUS}px solid #E2d1ff; 
    backgroundcolor: #Ccaff7;
`;

function Header() {
    const {user} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log(user);

    const handleLogout = () => {
        dispatch(logout());
    }

    const renderLoggedIn = (
        <Form inline>
            <SearchContainer type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="light">Search</Button>
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
        <NavbarContainer bg="light" expand="lg" sticky="top">
            <NavbarBrand href="#home">Color-Palettes</NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto justify-content-center">
                    <NavlinkContainer href="/">Home</NavlinkContainer>
                    <NavlinkContainer href="/palettes">Palettes</NavlinkContainer>
                    <NavlinkContainer href="/build">Build</NavlinkContainer>
                    <NavlinkContainer href="/gallery">Gallery</NavlinkContainer>
                    { user && <NavlinkContainer href="/current-user">My page</NavlinkContainer>}
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                { user ? renderLoggedIn : renderLoggedOut }
            </Navbar.Collapse>
        </NavbarContainer>
    );
}

export default Header;
