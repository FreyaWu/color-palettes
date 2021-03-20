import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import MessageAlert from '../Components/MessageAlert';

const Column = styled(Col)`
    background-color: ${props => props.color};
`;

function HomePage() {
    return (
        <Container fluid className="h-100">
            <MessageAlert />
            <Row className="h-100">
                <Column color={"#F299E3"} className="d-flex">
                    <div className="align-self-center mx-auto text-center">
                        <h1>Palette</h1>
                        <p>There are a lot of colors.</p>
                        <Button variant="outline-dark" href="/palettes">Check out colors</Button>
                    </div>
                </Column>
                <Column color={"#29F2F2"} className="d-flex">
                    <div className="align-self-center mx-auto text-center">
                        <h1>Build</h1>
                        <p>Build your own colors.</p>
                        <Button variant="outline-dark" href="/build">Get started</Button>
                    </div>
                </Column>
                <Column color={"#D7F29B"} className="d-flex">
                    <div className="align-self-center mx-auto text-center">
                        <h1>Gallery</h1>
                        <p>There are a lot of samples.</p>
                        <Button variant="outline-dark" href="/gallery">Check out samples</Button>
                    </div>
                </Column>
            </Row>
        </Container>
    );
}

export default withHeaderFooter(HomePage);