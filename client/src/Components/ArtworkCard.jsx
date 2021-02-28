import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import ColorBox from './ColorBox';
import Button from 'react-bootstrap/Button';
import LikeButton from '../Components/LikeBotton';

const CardOverlay = styled(Card.ImgOverlay)`
    opacity: 0;
    transition: opacity 0.3s ease;
    background: linear-gradient(
        180deg,
        transparent 62%,
        rgba(0, 0, 0, 0.00345888) 63.94%,
        rgba(0, 0, 0, 0.014204) 65.89%,
        rgba(0, 0, 0, 0.0326639) 67.83%,
        rgba(0, 0, 0, 0.0589645) 69.78%,
        rgba(0, 0, 0, 0.0927099) 71.72%,
        rgba(0, 0, 0, 0.132754) 73.67%,
        rgba(0, 0, 0, 0.177076) 75.61%,
        rgba(0, 0, 0, 0.222924) 77.56%,
        rgba(0, 0, 0, 0.267246) 79.5%,
        rgba(0, 0, 0, 0.30729) 81.44%,
        rgba(0, 0, 0, 0.341035) 83.39%,
        rgba(0, 0, 0, 0.367336) 85.33%,
        rgba(0, 0, 0, 0.385796) 87.28%,
        rgba(0, 0, 0, 0.396541) 89.22%,
        rgba(0, 0, 0, 0.4) 91.17%
    );
`;

const CardImageContainer = styled.div`
    &:hover ${CardOverlay} {
        opacity: 1;
    }
`;

const CardImage = styled(Card.Img)`
    height: 18vw;
    min-height: 270px;
    object-fit: cover;
`;

const PaletteContainer = styled.div`
    display: flex;
`;

const ColorSpan = styled.span`
    display: inline-block;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 1.5em;
    background-color: ${props => props.color};
`;


function ArtworkCard({artwork}) {
    const colors = artwork.colors;
    
    const fetchLikes = async () => {
        const likes = await axios.get(`/like/${artwork._id}/count`);
    };
    
    return (
        <Card className="border-0">
            <Link
                key={artwork._id}
                to={{
                    pathname: `/artworks/${artwork._id}`
                }}
            >
                <CardImageContainer className="position-relative">
                    <CardImage
                        className="img-fluid"
                        variant="top"
                        src={artwork.artwork}
                    />
                    <CardOverlay>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                    </Card.Text>
                        {/* <Card.Link href="#">View Detail</Card.Link> */}
                        {/* <div className="colorPalette" >
                        {colors.map(color => <ColorBox color={color} />)}
                    </div> */}
                    </CardOverlay>
                </CardImageContainer>
                <PaletteContainer>
                    {colors.map(color => <ColorSpan key={color} color={color} colorSize={colors.length} />)}
                </PaletteContainer>
                {/* <Card.Body>
                <p>test</p>
            </Card.Body> */}
            </Link>
            <Card.Footer>
                <Button onClick={fetchLikes}>Likes: 0{likes}</Button>
                {/* <LikeBotton onClick={fetchLikes}>Likes: {numLikes}</LikeBotton> */}
            </Card.Footer>
            
        </Card>
    )
}
export default ArtworkCard;
