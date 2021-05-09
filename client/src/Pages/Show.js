import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

import ColorCard from '../Components/ColorCard';
import PaletteService from '../Services/palette';
import LikeService from '../Services/like';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import MessageAlert from '../Components/MessageAlert';
import { Heart, HeartFill, TrashFill, EyeFill, PencilSquare, Link45deg } from 'react-bootstrap-icons';

const ColorDiv = styled.div`
    flex: 1 1 0;
    background-color: ${props => props.color};
    padding-top: 25%;
`;

const LikeButton = styled.div`
    cursor: ${({ isLoggedIn }) => isLoggedIn && 'pointer'};
    color: ${({ isLiked }) => isLiked && 'red'};
    &:hover {
        color: ${({ isLoggedIn }) => isLoggedIn && 'red'};
    }
`;

function ShowPage() {
    const { paletteId } = useParams();
    const { user } = useSelector(selectAuth);
    const [palette, setPalette] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const [views, setViews] = useState(0);
    const history = useHistory();

    const fetchViews = async () => {
        const { data: views } = await PaletteService.getPaletteViews(paletteId);
        setViews(views + 1);
        const newViews = await PaletteService.updatePaletteViews(paletteId, views + 1);
    }


    const fetchIsLiked = async () => {
        if (!user.username) {
            setIsLiked(false);
            return;
        }
        try {
            const { data: isLiked } = await LikeService.doesLikeExist(paletteId);
            setIsLiked(isLiked);
        } catch (e) {
            throw Error(e);
        }
    }

    const fetchNumLikes = async () => {
        try {
            const { data: likes } = await LikeService.getLikes(paletteId);
            setNumLikes(likes);
        } catch (e) {
            throw Error(e);
        }
    }

    const handleClickLike = async () => {
        try {
            if (isLiked) {
                await LikeService.deleteLike(paletteId);
            } else {
                await LikeService.postLike(paletteId);
            }
            fetchIsLiked();
        } catch (e) {
            throw Error(e);
        }
    }

    const handleClickDelete = async () => {
        try {
            await PaletteService.deletePalette(paletteId);
            setIsLiked(isLiked);
            history.replace('/palettes');
        } catch (e) {
            // throw Error(e);
        }
    }

    const fetchPalette = async () => {
        try {
            const { data: palette } = await PaletteService.getPalette(paletteId);
            setPalette(palette);
        } catch (e) {
            throw Error(e)
        }
    }

    useEffect(() => {
        fetchPalette();
        fetchIsLiked();
        fetchNumLikes();
        fetchViews();
    }, [paletteId, isLiked, user])

    const renderColorDiv = (
        <Container fluid className="d-flex p-0 bg-white">
            {palette && palette.colors && palette.colors.map(color => (
                <ColorDiv key={color} color={color} colorSize={palette.size} />
            ))}
        </Container>
    )

    const renderImage = (
        <Container fluid className="d-flex justify-content-center p-0">
            <Image
                fluid
                src={palette.image}
                style={{ width: "100%", objectFit: "contain", alignSelf: "start" }}
            >
            </Image>
        </Container >
    )

    return (
        <Container>
            <MessageAlert />
            <Row>
                {palette.image === "" ? renderColorDiv : renderImage}
            </Row>
            <Row className="d-flex bg-white py-2 mb-3 px-2 px-md-0 justify-content-center">
                <div className="font-weight-bold mr-auto mt-2">
                    Palette saved by {palette && palette.author && palette.author.username}
                </div>
                <div className="d-flex align-items-center mr-2">
                    <EyeFill variant="transparent" className="mr-1" />
                    <div className="mr-1">{views}</div>
                </div>

                <div className="d-flex align-items-center">
                    <LikeButton isLiked={isLiked} isLoggedIn={user.username} onClick={handleClickLike}>
                        {user.username ?
                            (isLiked ? <HeartFill variant="transparent" className="mr-1" /> :
                                <Heart variant="transparent" className="mr-1" />) :
                            <HeartFill className="mr-1" />
                        }
                    </LikeButton>
                    <div className="">{numLikes}</div>
                </div>

                <div className="pt-2 pt-md-0">
                    {user.username && palette.author && palette.author.username === user.username &&
                        <>
                            <Button variant="dark" href={`/palettes/${paletteId}/edit`} className="ml-3">
                                <PencilSquare /> Edit
                            </Button>
                            <Button variant="dark" className="ml-3" onClick={handleClickDelete}>
                                <TrashFill /> Delete
                            </Button>
                        </>
                    }
                    {palette.image &&
                        <Button variant="dark" className="ml-3" href={palette.image}>
                            <Link45deg /> Source
                        </Button>
                    }
                </div>
            </Row>

            <div className="d-flex flex-wrap w-100 mb-4">
                {palette.colors && palette.colors.map(color =>
                    <ColorCard key={color} color={color} lessOrEqualToFive={palette.size <= 5} />
                )}
            </div>
        </Container >
    );
}

export default withHeaderFooter(ShowPage);