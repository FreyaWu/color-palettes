
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectAuth } from '../Reducers/auth';

import Container from 'react-bootstrap/Container';
import ArtworkCard from '../Components/ArtworkCard';
import ArtworkService from '../Services/artwork';
import MessageAlert from '../Components/MessageAlert';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const ArtworksContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    padding-bottom: 20px;
`;

function GalleryPage() {
    const [artworks, setArtworks] = useState([]);
    const { user } = useSelector(selectAuth);

    useEffect(() => {
        const fetchArtworks = async () => {
            const { data: artworks } = await ArtworkService.getAllArtworks();
            setArtworks(artworks);
        };
        fetchArtworks();
    }, []);

    return (
        <>
            <Container fluid className="cus-container">
                <MessageAlert />
                <ArtworksContainer className="pt-4 px-4 card-deck">
                    {
                        artworks.map((artwork) => (
                            artwork.image && <ArtworkCard key={artwork._id} artwork={artwork} />
                        ))
                    }
                </ArtworksContainer>
            </Container>
        </>
    );
}

export default withHeaderFooter(GalleryPage);

