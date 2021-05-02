import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LikeButton from './LikeButton';
import { HeartFill } from "react-bootstrap-icons";

import ArtworkService from '../Services/artwork';
import LikeService from '../Services/like';

const CardImage = styled(Card.Img)`
    height: 270px;
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


function ArtworkCard({ artwork }) {
    const [likes, setLikes] = useState(0);
    const colors = artwork.colors;
    console.log(artwork);

    const fetchLikes = async () => {
        const { data: likes } = await LikeService.getLikes(artwork._id);
        setLikes(likes);
    }

    useEffect(() => {
        fetchLikes();
    }, [artwork._id])

    const addLike = async () => {
        await LikeService.postLike(artwork._id);
        fetchLikes();
    };

    return (
        <Card className="border-0">
            <Link
                key={artwork._id}
                to={{
                    pathname: `/palettes/${artwork._id}`
                }}
            >
                <CardImage
                    src={artwork.image}
                />
                {/* <CardImageContainer className="position-relative">

                    <CardOverlay >
                        <Card.Subtitle className="mb-2 text-muted ">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </CardOverlay>
                </CardImageContainer> */}
                <PaletteContainer>
                    {colors.map(color => <ColorSpan key={color} color={color} colorSize={colors.length} />)}
                </PaletteContainer>
            </Link>
            <Card.Footer className="d-flex border rounded-bottom bg-white">
                <h6 className="m-0 align-items-center">by {artwork.author.username}</h6>
                <div className="d-flex ml-auto align-items-center">
                    <HeartFill onClick={addLike} variant="transparent" className="mr-1" />
                    <div className="">{likes}</div>
                </div>
            </Card.Footer>
        </Card>
    )
}
export default ArtworkCard;
