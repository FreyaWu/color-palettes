import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import { LikeButton } from './PaletteCard';
import { Heart, HeartFill, EyeFill } from "react-bootstrap-icons";

import LikeService from '../Services/like';
import PaletteService from '../Services/palette';

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

function ArtworkCard({
    _id,
    colors,
    author,
    image,
    views,
}) {
    const { user } = useSelector(selectAuth);
    const [isLiked, setIsLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);

    const fetchNumLikes = async () => {
        try {
            const { data: likes } = await LikeService.getLikes(_id);
            setNumLikes(likes);
        } catch (e) {
            // throw Error(e);
            console.log(e);
        }
    }

    const fetchIsLiked = async () => {
        if (!user.username) {
            setIsLiked(false);
            return;
        }
        try {
            const { data: isLiked } = await LikeService.doesLikeExist(_id);
            setIsLiked(isLiked);
        } catch (e) {
            // throw Error(e);
            console.log(e);
        }
    }

    useEffect(() => {
        fetchIsLiked();
        fetchNumLikes();
    }, [_id, user]);

    const handleClickLike = async () => {
        if (!user.username) return;
        try {
            if (isLiked) {
                await LikeService.deleteLike(_id);
            } else {
                await LikeService.postLike(_id);
            }
            fetchIsLiked();
            fetchNumLikes();
        } catch (e) {
            throw Error(e);
        }
    };

    return (
        <Card>
            <Link
                key={_id}
                to={{
                    pathname: `/palettes/${_id}`
                }}
            >
                <CardImage
                    src={image}
                />
                <div className="d-flex">
                    {colors.map(color => <ColorSpan key={color} color={color} colorSize={colors.length} />)}
                </div>
            </Link>
            <Card.Footer className="d-flex bg-white">
                <h6 className="m-0 align-items-center">by {author.username}</h6>
                <div className="d-flex ml-auto">
                    <LikeButton isLiked={isLiked} isLoggedIn={user.username} onClick={handleClickLike}>
                        {user.username ?
                            (isLiked ? <HeartFill className="mr-1" /> :
                                <Heart className="mr-1" />) :
                            <HeartFill className="mr-1" />
                        }
                        {numLikes}
                    </LikeButton>
                    <div className="d-flex ml-2 align-items-center">
                        <EyeFill variant="transparent" className="mr-1" />
                        <div>{views}</div>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}
export default ArtworkCard;
