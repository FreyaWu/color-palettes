import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Color from 'color'

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    background-color: white;
`;
const FormContainer = styled.div`
    width:50%;
    height:50%;
    margin:0 auto;
    background:#f7f7f7;
    margin-top: 10%;
    padding: 3%
`;

function LoginPage() {
    const [input, setInput] = useState({});

    const handleInput = (e) => {
        setInput({username: e.username});
    }

    return (
        <PageContainer fluid>
            <FormContainer>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control as="input" type="string" placeholder="Enter username" onSubmit={handleInput}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="dark" type="submit" block href="/register">
                    Submit
                </Button>
            </FormContainer>
        </PageContainer>
    );
}

export default LoginPage;