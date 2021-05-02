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
import { device } from '../device';
import Carousel from 'react-bootstrap/Carousel'

// import ColorTable from '../Components/ColorTable';
import ColorCard from '../Components/ColorCard';
import PaletteService from '../Services/palette';
import LikeService from '../Services/like';
import MessageAlert from '../Components/MessageAlert';
import { HeartFill, TrashFill, EyeFill, PencilSquare, Link45deg } from 'react-bootstrap-icons';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const ColorCol = styled(Col)`
    flex: 1 1 10%;
`

const ColorItem = styled.div`
    height: 15vh;

    @media ${device.tablet} {
        height: 30vh;
    }

    @media ${device.laptop} {
        height: 40vh;
    }
`

const PaletteContainer = styled(Container)`
    @media ${device.tablet} {
        width: 75%;
    }

    @media ${device.laptop} {
        width: 50%;
    }
`

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
    }

    const fetchNumLikes = async () => {
        try {
            const { data: likes } = await LikeService.getLikes(paletteId);
            setNumLikes(likes);
        } catch (e) {
            throw Error(e);
        }
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
        fetchPalette();
        fetchNumLikes();
        fetchIsLiked();
        fetchViews();
    }, [paletteId])

    const renderColorDiv = (
        <Container fluid>
            <Row>
                {palette.colors && palette.colors.map(color =>
                    <ColorCol className="p-0">
                        <ColorItem style={{ backgroundColor: color }} />
                    </ColorCol>
                )}
            </Row>
        </Container>
    )

    const renderImage = (
        <Container className="d-flex justify-content-center p-0">
            <Image
                fluid
                src={palette.image}
                style={{ objectFit: "contain", width: "100%", alignSelf: "start" }}
            >
            </Image>
        </Container >
    )

    const renderImageAndColorDiv = (
        <Carousel interval={null}>
            <Carousel.Item>
                {renderImage}
            </Carousel.Item>
            <Carousel.Item>
                {renderColorDiv}
            </Carousel.Item>
        </Carousel>
    );

    return (
        <Container fluid>
            <MessageAlert />

            <div>
                {palette.image === "" ? renderColorDiv : renderImageAndColorDiv}
            </div>

            <Container>
                <Row className="py-2 align-items-center justify-content-center">
                    <div className="mr-auto">
                        <div>
                            saved by <span className="font-weight-bold">{palette && palette.author && palette.author.username} </span>
                        </div>
                    </div>
                    <div>
                        {
                            user.username &&
                            <Button variant={isLiked ? "danger" : "outline-danger"} onClick={handleClickLike}>
                                <HeartFill /> {isLiked ? "Liked" : "Like"}
                            </Button>
                        }
                    </div>
                    <div className="ml-sm-0 mr-sm-0">
                        {
                            user.username && palette.author && palette.author.username === user.username &&
                            <>
                                <Button variant="dark" href={`/palettes/${paletteId}/edit`} className="ml-3">
                                    <PencilSquare /> Edit
                                </Button>
                                <Button variant="dark" className="ml-3" onClick={handleClickDelete}>
                                    <TrashFill /> Delete
                                </Button>
                            </>
                        }
                        {
                            palette.image &&
                            <Button variant="dark" className="ml-3" href={palette.image}>
                                <Link45deg /> Source
                            </Button>
                        }
                    </div>
                    {/* <Col sm={3} className="d-flex justify-content-center justify-content-sm-start mb-2 mb-sm-0">
                        <div>
                            saved by <span className="font-weight-bold">{palette && palette.author && palette.author.username} </span>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center justify-content-sm-end">
                        {
                            user.username &&
                            <Button variant={isLiked ? "danger" : "outline-danger"} onClick={handleClickLike}>
                                <HeartFill /> {isLiked ? "Liked" : "Like"}
                            </Button>}
                        {
                            user.username && palette.author && palette.author.username === user.username &&
                            <>
                                <Button variant="dark" href={`/palettes/${paletteId}/edit`} className="ml-3">
                                    <PencilSquare /> Edit
                                </Button>
                                <Button variant="dark" className="ml-3" onClick={handleClickDelete}>
                                    <TrashFill /> Delete
                                </Button>
                            </>
                        }
                        {
                            palette.image &&
                            <Button variant="dark" className="ml-3" href={palette.image}>
                                <Link45deg /> Source
                            </Button>
                        }
                    </Col> */}
                </Row>
            </Container>

            <PaletteContainer className="mt-2 mb-4">
                <Row className="mx-2 mx-sm-0 mb-2">
                    <div className="font-weight-bold">Palette</div>
                    <div className="d-flex ml-auto">
                        <div className="d-flex align-items-center">
                            <HeartFill className="mr-1" />
                            <div>{numLikes}</div>
                        </div>
                        <div className="ml-2 d-flex align-items-center">
                            <EyeFill variant="transparent" className="mr-1" />
                            <div>{views}</div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="w-100 d-flex flex-wrap">
                        {palette.colors && palette.colors.map(color =>
                            <ColorCard key={color} color={color} lessOrEqualToFive={palette.colors.length <= 5} />
                        )}
                    </div>
                </Row>
            </PaletteContainer>
        </Container>
    );
}

export default withHeaderFooter(ShowPage);