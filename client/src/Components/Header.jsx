import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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

    const handleLogout = () => {
        dispatch(logout());
    }

    const renderLoggedIn = (
        <Form inline>
            <Button className="ml-auto btn btn-sm btn-secondary" onClick={handleLogout}>Log out</Button>
        </Form>
    )

    const renderLoggedOut = (
        <Form inline>
            <Button className="ml-auto mr-2 btn btn-sm btn-secondary" href="/register">Register</Button>
            <Link to={{
                pathname: "/login",
                state: { from: location.pathname }
            }}>
                <Button className="ml-auto btn btn-sm btn-secondary">Login</Button>
            </Link>
        </Form>
    )
    return (
        <NavbarContainer className="text-align-center" bg="light" expand="lg" sticky="top">
            <div>
                <NavbarBrand variant="dark" href="/" className="font-weight-bold">
                    Color Palettes
                </NavbarBrand>
                <a
                    className="pl-1"
                    style={{ fontSize: "14px", color: "black" }}
                    href="https://www.linkedin.com/in/freya-wu/">by Freya
                </a>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto mr-auto">
                    <NavlinkContainer href="/palettes">Palettes</NavlinkContainer>
                    <NavlinkContainer href="/build">Build</NavlinkContainer>
                    <NavlinkContainer href="/gallery">Gallery</NavlinkContainer>
                    {user && <NavlinkContainer href="/profile">My Page</NavlinkContainer>}
                </Nav>
                {user ? renderLoggedIn : renderLoggedOut}
            </Navbar.Collapse>
        </NavbarContainer>
    );
}

export default Header;
