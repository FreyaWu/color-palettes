import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from '../Actions/auth';
import { selectAuth } from '../Reducers/auth';
import { setMessage } from '../Actions/message'
import MessageAlert from '../Components/MessageAlert';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';
import withHeaderFooter from '../Hocs/withHeaderFooter';


const FormContainer = styled(Form)`
    background:#f7f7f7;
`;

function LoginPage() {
    const { user } = useSelector(selectAuth);
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
        if (user.username) {
            dispatch(setMessage("info", `Welcome back, ${user.username}`))
            if (location.state && location.state.from &&
                (location.state.from !== "/login" && location.state.from !== "/register")) {
                history.push(location.state.from);
            } else {
                history.push('/palettes');
            }
        }
    }, [user]);//only run useEffect when user updates. empty[] / no [], run after every render

    return (
        <Container fluid>
            <MessageAlert />
            <Row className="justify-content-center mt-2 mt-md-3 mt-xl-5">
                <Col className="col-12 col-md-6 mt-2 mt-sm-5">
                    <div className="text-center py-3">
                        <h3>Sign in to Color Palette</h3>
                    </div>
                    <Formik
                        validationSchema={schema}
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
                            <FormContainer onSubmit={handleSubmit} className="d-flex p-5">

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
                </Col>
            </Row>


        </Container>
    );
}


export default withHeaderFooter(LoginPage);
