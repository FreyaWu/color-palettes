import React from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

import useArtwork from '../Hooks/useArtwork';

import withHeaderFooter from '../Hocs/withHeaderFooter';

function ArtworkPage() {
    let { id } = useParams();
    const artworkData = useArtwork(id);
    console.log(artworkData);
    const {
        colorPalette,
        title,
        image,
        username,
        description,
    } = artworkData;

    return (
        <Container>
            <Row>
                <Col xs={10} md={8} className="mx-auto pt-4">
                    <Media>
                        <Media.Body>
                            <h5>{title}</h5>
                            <p>by {username}</p>
                        </Media.Body>
                    </Media>
                    <Image
                        fluid
                        className="mx-auto"
                        src={image}
                    >
                    </Image>
                </Col>
            </Row>
        </Container>
    );
}

export default withHeaderFooter(ArtworkPage);