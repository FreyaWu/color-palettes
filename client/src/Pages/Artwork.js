import React from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';

import useArtwork from '../Hooks/useArtwork';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const PaletteContainer = styled.div`
        
    `;

const ColContainer = styled(Col)`
    padding: 3em;
`;

const ColorSpan = styled.span`
    display: block;
    flex: 1;
    width: calc(100% / ${props => props.size});
    height: 3em;
    background-color: ${props => props.color};

`;

function ArtworkPage() {
    let { id } = useParams();
    const artworkData = useArtwork(id);
    console.log(artworkData);
    const {
        author,
        title,
        artwork,
        size,
        colors
    } = artworkData;

    return (
        <Container>
            <Row>
                <ColContainer xs={10} md={8} className="mx-auto pt-4">
                    <Media>
                        <Media.Body>
                            <h5>{title}</h5>
                            <p>by {author && author.username}</p>
                        </Media.Body>
                    </Media>
                    <Image
                        fluid
                        className="mx-auto"
                        src={artwork}
                    >
                    </Image>
                    <PaletteContainer>
                        {colors && colors.map(color => 
                        <ColorSpan key={color} color={color} colorSize={size} className="text-center">
                            {tinyColor(color).toHexString()}
                            <br />
                            {tinyColor(color).toRgbString()}   

                        </ColorSpan>)}
                    </PaletteContainer>
                </ColContainer>
            </Row>
        </Container>
    );
}

export default withHeaderFooter(ArtworkPage);