import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import PaletteCard from '../Components/PaletteCard';
import PaletteService from '../Services/palette';
import MessageAlert from '../Components/MessageAlert';
import withHeaderFooter from '../Hocs/withHeaderFooter';

const PalettesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
    grid-gap: 20px;
`;

function PaletteGalleryPage() {
    const [palettes, setPalettes] = useState([]);

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
        <Container fluid>
            <MessageAlert />
            <PalettesContainer className="px-sm-4">
                {palettes.map(palette => (
                    <PaletteCard key={palette._id} {...palette} />
                ))}
            </PalettesContainer>
        </Container>
    );
}

export default withHeaderFooter(PaletteGalleryPage);