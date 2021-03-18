import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {register} from '../Actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import { useHistory, Redirect } from "react-router-dom";
import { setMessage } from '../Actions/message';
import MessageAlert from '../Components/MessageAlert';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withHeaderFooter from '../Hocs/withHeaderFooter';

const FormContainer = styled(Form)`
    background:#f7f7f7;
`;

function RegisterPage() {
    const {user} = useSelector(selectAuth);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const schema = Yup.object().shape({
        username: Yup.string()
            .required()
            .min(2)
            .max(25),
        email: Yup.string()
            .required()
            .email(),
        password: Yup.string()
            .required()
            .min(4)
            .max(20),
    })

    const handleSubmit = (input) => {
        dispatch(register(input));
    }

    useEffect(() => {
        if (user.username) {
            dispatch(setMessage("info", `Welcome, ${user.username}`))
            console.log(user.username);
            history.replace('/palettes');
        }
    },[user])

    return (
        <Container fluid>
            <div className="text-center mt-5 py-3">
                <h2>Sign up to Color Palette</h2>
            </div>
            <Formik
                validationSchema = {schema}
                onSubmit = {(values) => { handleSubmit(values) }}
                initialValues = {{
                    username: '',
                    email: '',
                    password: '',
                }}
            >
                { ({handleSubmit, handleChange, values, errors}) => (
                    <FormContainer className="w-50 mx-auto p-5" noValidate onSubmit={handleSubmit} >
                        <MessageAlert />
                        <div className="w-100">
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    name="username" 
                                    type="string" 
                                    value={values.username} 
                                    onChange={handleChange} 
                                    isInvalid={!!errors.username}/>
                                <Form.Control.Feedback>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    name="email" 
                                    type="email" 
                                    value={values.email}
                                    onChange={handleChange} 
                                    isInvalid={!!errors.email}/>
                                <Form.Control.Feedback>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password" 
                                    type="password" 
                                    value={values.password}
                                    onChange={handleChange} 
                                    isInvalid={!!errors.password}/>
                                <Form.Control.Feedback>
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="dark" type="submit" block>
                                Register
                            </Button>
                        </div>
                    </FormContainer>
                ) }
            </Formik>
        </Container>
    );
}

export default withHeaderFooter(RegisterPage);