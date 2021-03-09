
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


import {Link, useLocation, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../Reducers/auth';

import useArtwork from '../Hooks/useArtwork';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const PalettesContainer = styled.div`
    width: 75%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    padding-top: 3rem;
    padding-bottom: 3rem;
`;

const ColorSpan = styled.div`
    display: inline-block;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 4em;
    background-color: ${props => props.color};
    border-top-left-radius: ${props => props.index === 0 && '0.2rem'};
    border-top-right-radius: ${props => props.index === props.colorSize - 1 && '0.2rem'};
`;

function UserPage() {
    const {user} = useSelector(selectAuth);
    // console.log(user);
    const [likedPalettes, setLikedPalettes] = useState([]);

    useEffect(() => {
        const fetchLikes = async () => {
            // console.log(user);
            const { data: likedPalettes } = await axios.get(`/auth/user/${user._id}`);
            setLikedPalettes(likedPalettes);
        };
        if (user) fetchLikes();
    }, [user]);

    return (
        <Container fluid className="mt-4">
            <Container className="bg-light">
                <Row className="justify-content-md-center">
                    <h2>This is {user && user.username}'s userpage</h2>
                </Row>
                
                <Row className="justify-content-md-center">
                    <Col>
                        <PalettesContainer className=" px-4 card-deck my-auto">
                            <Button variant="light" type="submit" class="text-center">
                                Upload your palette
                            </Button>
                            {likedPalettes.map(likedPalette => (
                                <Card key={likedPalette._id} className="border-0">
                                    <Link
                                        key={likedPalette._id}
                                        to={{
                                            pathname: `/artworks/${likedPalette._id}`
                                        }}
                                    >
                                        <div className="d-flex rounded-top">
                                            {likedPalette.colors.map((color, index) => (
                                                <ColorSpan key={index} colorSize={likedPalette.size} color={color} index={index} />
                                            ))}
                                        </div>
                                    </Link>
                                    <Card.Footer className="border rounded-bottom bg-white">
                                        <h6>test</h6>
                                    </Card.Footer>
                                </Card>
                            ))}
                        </PalettesContainer>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default withHeaderFooter(UserPage);