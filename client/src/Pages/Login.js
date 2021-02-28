import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {login} from '../Actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: white;
`;

const FormContainer = styled(Form)`
    width:50%;
    height:50%;
    margin:0 auto;
    background:#f7f7f7;
    margin-top: 10%;
    padding: 3%
`;

function LoginPage(props) {
    const [input, setInput] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput({...input,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            dispatch(login(input));//dispatch action
            history.push("/gallery");
    }

    return (
        <PageContainer fluid>
            <FormContainer onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required name="username" type="string" placeholder="Enter username" onChange={handleChange}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name="password" type="password" placeholder="Password" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="dark" type="submit" block>
                    Submit
                </Button>
            </FormContainer>
        </PageContainer>
    );
}


export default LoginPage;
