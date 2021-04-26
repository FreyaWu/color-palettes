import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import PaletteCard from '../Components/PaletteCard';
import PaletteService from '../Services/palette';
import MessageAlert from '../Components/MessageAlert';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const PalettesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
`;

function PaletteGalleryPage() {
    const [palettes, setPalettes] = useState([]);
    // console.log('palette gallery');

    useEffect(() => {
        let mounted = true;
        const fetchPalettes = async () => {
            const { data: palettes } = await PaletteService.getAllPalettes();
            if (mounted) setPalettes(palettes);
        };
        fetchPalettes();
        return () => (mounted = false);
    }, []);
    return (
        <Container fluid className="mt-4">
            <MessageAlert />
            <PalettesContainer className="px-4 card-deck">
                {palettes.map(palette => (
                    <PaletteCard key={palette._id} {...palette} />
                ))}
            </PalettesContainer>
        </Container>
    );
}

export default withHeaderFooter(PaletteGalleryPage);