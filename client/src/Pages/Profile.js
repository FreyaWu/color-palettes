
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {Link, useLocation, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { PaletteFill, HeartFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../Reducers/auth';
import PaletteCard from '../Components/PaletteCard';
import UserService from '../Services/user';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import { TabletLandscape } from 'react-bootstrap-icons';
import palette from '../Services/palette';

const CardDiv = styled.div`
    width:33.333%;
`;

function Profile() {
    const {user} = useSelector(selectAuth);
    // console.log(user);
    const [userPalettes, setUserPalettes] = useState([]);
    const [likedPalettes, setLikedPalettes] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchUserPalettes = async() => {
            const {data: userPalettes} = await UserService.getUserPalettes();
            setUserPalettes(userPalettes);
        }
        const fetchLikedPalettes = async () => {
            const { data: likedPalettes } = await UserService.getLikedPalettes();
            console.log(likedPalettes);
            setLikedPalettes(likedPalettes);
        };
        if(mounted) {
            user.username && fetchUserPalettes() && fetchLikedPalettes();
        }
        return () => {mounted = false}
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
                                <Container className="card-deck">
                                    {userPalettes.map(palette => (
                                        <CardDiv className="my-3">
                                            <PaletteCard key={palette._id} {...palette}/>
                                        </CardDiv>
                                    ))}
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
                                <Container className="card-deck">
                                    {likedPalettes && likedPalettes.map(palette => (
                                        <CardDiv className="my-3">
                                            <PaletteCard key={palette._id} {...palette}/>
                                        </CardDiv>
                                    ))}
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