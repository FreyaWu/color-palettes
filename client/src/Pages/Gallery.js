
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth'; 

import Container from 'react-bootstrap/Container';
import Cover from '../Components/Cover';
import ArtworkCard from '../Components/ArtworkCard';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const ArtworksContainer = styled.div`
    background-color: #D7F29B;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    padding-bottom: 20px;
`;

function GalleryPage() {
    const [artworks, setArtworks] = useState([]);
    const {user} = useSelector(selectAuth);

    useEffect(() => {
        let mounted = true;
        const fetchArtworks = async () => {
            const { data: artworks } = await axios.get('/artworks');
            if (mounted) setArtworks(artworks);
        };
        fetchArtworks();
        return () => (mounted = false);
    }, []);

    return (
        <>
            <Cover />
            <Container fluid className="cus-container">
                <ArtworksContainer className="pt-4 px-4 card-deck">
                    {
                        artworks.map((artwork) => (
                            <ArtworkCard key={artwork._id} artwork={artwork} />//
                        ))
                    }
                </ArtworksContainer>
            </Container>
        </>
    );
}

export default withHeaderFooter(GalleryPage);

