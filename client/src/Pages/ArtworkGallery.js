
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import ArtworkCard from '../Components/ArtworkCard';
import ArtworkService from '../Services/artwork';
import MessageAlert from '../Components/MessageAlert';

const ArtworksContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
    grid-gap: 20px;
`;

function ArtworkGalleryPage() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchArtworks = async () => {
            const { data: artworks } = await ArtworkService.getAllArtworks();
            if (mounted) setArtworks(artworks);
        };
        fetchArtworks();
        return () => (mounted = false);
    }, []);

    return (
        <Container fluid>
            <MessageAlert />
            <ArtworksContainer className="px-sm-4">
                {
                    artworks.map((artwork) => (
                        artwork.image && <ArtworkCard key={artwork._id} artwork={artwork} />
                    ))
                }
            </ArtworksContainer>
        </Container>
    );
}

export default withHeaderFooter(ArtworkGalleryPage);

