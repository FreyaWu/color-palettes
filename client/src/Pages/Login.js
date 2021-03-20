import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {login} from '../Actions/auth';
import { selectAuth } from '../Reducers/auth';
import { setMessage } from '../Actions/message'
import MessageAlert from '../Components/MessageAlert';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from 'yup';
import withHeaderFooter from '../Hocs/withHeaderFooter';


const FormContainer = styled(Form)`
    background:#f7f7f7;
`;

function LoginPage() {
    const {user} = useSelector(selectAuth);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const schema = Yup.object().shape({
        username: Yup.string()
            .required()
            .min(2)
            .max(25),
        password: Yup.string()
            .required()
    })

    const handleSubmit = (input) => {
        dispatch(login(input));
    }

    useEffect(() => {
        if(user.username) {
            dispatch(setMessage("info", `Welcome back, ${user.username}`))
            if (location.state && location.state.from &&
                (location.state.from !== "/login" && location.state.from !== "/register")) {
                history.push(location.state.from);
            } else {
                history.push('/palettes');
            }
        }
    },[user]);//only run useEffect when user updates. empty[] / no [], run after every render

    return (
        <Container fluid>
            <MessageAlert />
            <div className="text-center mt-5 py-3">
                <h2>Sign in to Color Palette</h2>
            </div>
            <Formik
                validationSchema = {schema}
                onSubmit={(values) => { handleSubmit(values) }}
                initialValues={{
                    username: '',
                    password: '',
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <FormContainer onSubmit={handleSubmit} className="d-flex mx-auto w-50 p-5">
                        
                        <div className="w-100">
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    name="username" 
                                    type="string" 
                                    value={values.username} 
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password" 
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="dark" type="submit" block>
                                Sign in
                            </Button>
                        </div>
                    </FormContainer>
                )}
            </Formik>
        </Container>
    );
}


export default withHeaderFooter(LoginPage);
