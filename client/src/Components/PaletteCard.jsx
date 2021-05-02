import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';//这个link是干什么用的？
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import Card from 'react-bootstrap/Card';
import { Heart, HeartFill, EyeFill, ImageFill } from "react-bootstrap-icons";
import styled from 'styled-components';

import LikeService from '../Services/like';

const ColorSpan = styled.div`
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 5em;
    background-color: ${props => props.color};
`;

export const LikeButton = styled.div`
    cursor: ${({ isLoggedIn }) => isLoggedIn && 'pointer'};
    color: ${({ isLiked }) =>
        isLiked && 'red'
    };
    &:hover {
        color: ${({ isLoggedIn }) =>
        isLoggedIn && 'red'
    }};
`;

const CardThumbnail = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 0 12px;
    height: 40px;
`;

function PaletteCard({
    _id,
    colors,
    author,
    views,
    image,
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
            // throw Error(e);
            console.log(e);
        }
    };

    return (
        <Card className="border-0">
            <Link
                key={_id}
                to={{
                    pathname: `/palettes/${_id}`
                }}
            >
                <CardThumbnail className="d-flex justify-content-end text-white mt-2">
                    {image && <ImageFill />}
                </CardThumbnail>
                <div className="d-flex rounded-top">
                    {colors.map((color, index) => (
                        <ColorSpan
                            key={index}
                            colorSize={colors.length}
                            color={color}
                            index={index}
                        />
                    ))}
                </div>
            </Link>
            <Card.Footer className="border d-flex bg-white">
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

export default PaletteCard;
