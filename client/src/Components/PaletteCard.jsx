import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';//这个link是干什么用的？
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {HeartFill} from "react-bootstrap-icons";
import styled from 'styled-components';

const ColorSpan = styled.div`
    display: inline-block;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 4em;
    background-color: ${props => props.color};
    border-top-left-radius: ${props => props.index === 0 && '0.2rem'};
    border-top-right-radius: ${props => props.index === props.colorSize - 1 && '0.2rem'};
`;

function PaletteCard({palette}) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        fetchLikes();
    },[palette._id])

    const fetchLikes = async () => {
        const likes = await axios.get(`/like/${palette._id}/count`);
        setLikes(likes.data);
    }
    
    const addLikes = async (palette) => {
        await axios.post(`/like/${palette._id}`);
        fetchLikes();
    };

    return (
    <Card key={palette._id} className="border-0">
        <Link
            key={palette._id}
            to={{
                pathname: `/artworks/${palette._id}`
            }}
        >
            <div className="d-flex rounded-top">
                {palette.colors.map((color, index) => (
                    <ColorSpan key={index} colorSize={palette.size} color={color} index={index} />
                ))}
            </div>
        </Link>
        <Card.Footer className="d-flex border rounded-bottom bg-white">
            <h6 className="m-0 align-items-center">by {palette.author.username}</h6>
            <div className="d-flex ml-auto align-items-center">
                <HeartFill onClick={() => addLikes(palette)} variant="transparent" className="mr-1"/>
                <div className="">{likes}</div>
            </div>
        </Card.Footer>
    </Card>
)
}

export default PaletteCard;
