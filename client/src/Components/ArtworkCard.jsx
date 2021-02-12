import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ColorBox from './ColorBox';

function ArtworkCard(props) {
    const colors = props.artwork.colorPalette;
    return (
        <Card style={{ width: '18rem' }} bg="transparent">
            <Card.Body>
                <Card.Img variant="top" src={props.artwork.image} alt={props.artwork.title} />
                <Card.ImgOverlay>
                    <Card.Title>{props.artwork.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Link href="#">View Detail</Card.Link>
                    <div className="colorPalette" >
                        {colors.map(color => <ColorBox color={color}/>)}
                    </div>
                </Card.ImgOverlay>

            </Card.Body>
        </Card>
    )
}
export default ArtworkCard;