import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { Heart, HeartFill, EyeFill } from "react-bootstrap-icons";
import { LikeButton } from './PaletteCard';

import PaletteService from '../Services/palette';
import LikeService from '../Services/like';
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth';

const CardImage = styled(Card.Img)`
    height: 270px;
    object-fit: cover;
`;

const ColorSpan = styled.span`
    display: inline-block;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 1.5em;
    background-color: ${props => props.color};
`;


function ArtworkCard({ artwork }) {
    const { user } = useSelector(selectAuth);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const colors = artwork.colors;
    const [views, setViews] = useState(artwork.views);

    const fetchIsLiked = async () => {
        if (!user) {
            setIsLiked(false);
            return;
        }
        try {
            const { data: isLiked } = await LikeService.doesLikeExist(artwork._id);
            setIsLiked(isLiked);
        } catch (e) {
            // throw Error(e);
            console.log(e);
        }
    }

    const fetchLikes = async () => {
        const { data: likes } = await LikeService.getLikes(artwork._id);
        setLikes(likes);
    }

    const fetchViews = async () => {
        const { data: views } = await PaletteService.getPaletteViews(artwork._id);
        setViews(views);
    }

    useEffect(() => {
        fetchIsLiked();
        fetchLikes();
        fetchViews();
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
                <div className="position-relative">
                    <CardImage
                        className="img-fluid"
                        variant="top"
                        src={artwork.image}
                    />
                </div>
                <div className="d-flex">
                    {colors.map(color => <ColorSpan key={color} color={color} colorSize={colors.length} />)}
                </div>
            </Link>
            <Card.Footer className="d-flex border rounded-bottom bg-white">
                <h6 className="m-0 align-items-center">by {artwork.author.username}</h6>
                <div className="d-flex ml-auto align-items-center">
                    <LikeButton isLiked={isLiked} isLoggedIn={user.username} onClick={addLike}>
                        {user.username ?
                            (isLiked ? <HeartFill className="mr-1" /> :
                                <Heart className="mr-1" />) :
                            <HeartFill className="mr-1" />
                        }
                    </LikeButton>
                    <div className="">{likes}</div>
                </div>
                <div className="d-flex ml-2 align-items-center">
                    <EyeFill variant="transparent" className="mr-1" />
                    <div>{views}</div>
                </div>
            </Card.Footer>
        </Card>
    )
}
export default ArtworkCard;
