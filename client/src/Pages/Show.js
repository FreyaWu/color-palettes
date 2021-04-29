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
import { HeartFill, TrashFill, EyeFill, PencilSquare, Link45deg } from 'react-bootstrap-icons';
import artwork from '../Services/artwork';

const ColorDiv = styled.div`
    flex: 1 1 0;
    background-color: ${props => props.color};
    padding-top: 15%;
`;

function ShowPage() {
    const { paletteId } = useParams();
    const { user } = useSelector(selectAuth);
    const [palette, setPalette] = useState({});
    const [isLiked, setIsLiked] = useState(false);
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
        let mounted = true;
        if (mounted) {
            fetchPalette();
            fetchIsLiked();
            fetchViews();
        }
        return () => { mounted = false }
    }, [paletteId])

    const renderColorDiv = (
        <Container fluid className="d-flex p-0 bg-white">
            {palette && palette.colors && palette.colors.map(color => (
                <ColorDiv key={color} color={color} colorSize={palette.size} />
            ))}
        </Container>
    )

    const renderImage = (
        <Container className="d-flex justify-content-center bg-white p-0">
            <Image
                fluid
                className="mx-auto"
                src={palette.image}
                className="d-flex"
            >
            </Image>
        </Container >
    )
    return (
        <Container>
            <MessageAlert />
            <div>
                {palette.image === "" ? renderColorDiv : renderImage}
            </div>
            <Container>
                <Container className="d-flex bg-white py-2 mb-3">
                    <div className="font-weight-bold mr-auto">
                        Palette saved by {palette && palette.author && palette.author.username}
                    </div>
                    <div className="d-flex align-items-center mr-2">
                        <EyeFill variant="transparent" className="mr-1" />
                        <div className="mr-1">{views}</div>
                    </div>
                    <div>
                        {user.username && <Button variant={isLiked ? "danger" : "outline-danger"} onClick={handleClickLike}>
                            <HeartFill /> {isLiked ? "Liked" : "Like"}
                        </Button>}
                    </div>
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
                            <Link45deg /> Source link
                        </Button>
                    }
                </Container>

            </Container>
            <Container className="d-flex flex-wrap p-0 mb-4">
                {palette.colors && palette.colors.map(color =>
                    <ColorCard key={color} color={color} addGrowShrink={palette.size <= 5} />
                )}
            </Container>
        </Container>
    );
}

export default withHeaderFooter(ShowPage);