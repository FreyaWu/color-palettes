import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';//这个link是干什么用的？
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Heart, HeartFill, Eye, EyeFill } from "react-bootstrap-icons";
import styled from 'styled-components';
import LikeService from '../Services/like';
import PaletteService from '../Services/palette';

const ColorSpan = styled.div`
    display: inline-block;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 4em;
    background-color: ${props => props.color};
    border-top-left-radius: ${props => props.index === 0 && '0.2rem'};
    border-top-right-radius: ${props => props.index === props.colorSize - 1 && '0.2rem'};
`;

function PaletteCard({ _id, colors, size, author }) {
    const { user } = useSelector(selectAuth);
    const [isLiked, setIsLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const [views, setViews] = useState(0);

    const fetchViews = async () => {
        const { data: views } = await PaletteService.getPaletteViews(_id);
        setViews(views);
    }

    const fetchNumLikes = async () => {
        try {
            const { data: likes } = await LikeService.getLikes(_id);
            setNumLikes(likes);
        } catch (e) {
            throw Error(e);
        }
    }

    const fetchIsLiked = async () => {
        if (!user) {
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
        fetchViews();
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
        <Card className="border-0">
            <Link
                key={_id}
                to={{
                    pathname: `/palettes/${_id}`
                }}
            >
                <div className="d-flex rounded-top">
                    {colors.map((color, index) => (
                        <ColorSpan key={index} colorSize={size} color={color} index={index} />
                    ))}
                </div>
            </Link>
            <Card.Footer className="d-flex border rounded-bottom bg-white">
                <h6 className="m-0 align-items-center">by {author.username}</h6>
                <div className="d-flex ml-auto align-items-center" style={{ cursor: 'pointer' }} onClick={handleClickLike}>
                    {isLiked ?
                        <HeartFill variant="transparent" className="mr-1" /> :
                        <Heart variant="transparent" className="mr-1" />
                    }
                    <div className="">{numLikes}</div>
                </div>
                <div className="d-flex ml-2 align-items-center">
                    <EyeFill variant="transparent" className="mr-1" />
                    <div>{views}</div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default PaletteCard;
