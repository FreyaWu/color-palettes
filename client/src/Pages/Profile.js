
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { PaletteFill, HeartFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import PaletteCard from '../Components/PaletteCard';
import UserService from '../Services/user';
import withHeaderFooter from '../Hocs/withHeaderFooter';

function Profile() {
    const { user } = useSelector(selectAuth);
    // console.log(user);
    const [userPalettes, setUserPalettes] = useState([]);
    const [likedPalettes, setLikedPalettes] = useState([]);
    const history = useHistory();

    const fetchUserPalettes = async () => {
        const { data: userPalettes } = await UserService.getUserPalettes();
        setUserPalettes(userPalettes);
    }

    const fetchLikedPalettes = async () => {
        const { data: likedPalettes } = await UserService.getLikedPalettes();
        setLikedPalettes(likedPalettes);
    };

    useEffect(() => {
        if (user === "") {
            history.push('/login');
        }
        fetchUserPalettes();
        fetchLikedPalettes();
    }, [user, likedPalettes]);

    return (
        <Container fluid>
            <Container className="my-3">
                <h3>{user.username}'s profile</h3>
            </Container>
            <Container>
                <Tabs defaultActiveKey="palettes" id="profile-tabs">
                    <Tab eventKey="palettes" title={<>< PaletteFill /> Palettes</>}>
                        <Container className="d-flex bg-white border border-top-0">
                            {userPalettes.length === 0 ?
                                <div className="text-center w-100 my-5">
                                    <h5>You haven't created any palettes yet.</h5>
                                </div> :
                                <Container>
                                    <Row>
                                        {userPalettes && userPalettes.map(palette => (
                                            <Col sm={12} md={6} lg={4}>
                                                <div className="my-3">
                                                    <PaletteCard key={palette._id} {...palette} />
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            }
                        </Container>
                    </Tab>
                    <Tab eventKey="liked" title={<>< HeartFill /> Liked</>}>
                        <Container className="d-flex bg-white border border-top-0">
                            {likedPalettes.length === 0 ?
                                <div className="text-center w-100 my-5">
                                    <h5>You haven't liked any palettes yet.</h5>
                                </div> :
                                <Container>
                                    <Row>
                                        {likedPalettes && likedPalettes.map(palette => (
                                            <Col sm={12} md={6} lg={4}>
                                                <div className="my-3">
                                                    <PaletteCard key={palette._id} {...palette} />
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            }
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        </Container>
    );
}

export default withHeaderFooter(Profile);