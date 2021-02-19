import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';//这个link是干什么用的？
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const PalettesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
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


function PaletteGalleryPage() {
    const [palettes, setPalettes] = useState([]);
    console.log('palette gallery');
    useEffect(() => {
        let mounted = true;
        const fetchPalettes = async () => {
            const { data: palettes } = await axios.get('/palettes');
            if (mounted) setPalettes(palettes);
        };
        fetchPalettes();
        return () => (mounted = false);
    }, []);

    return (
        <Container fluid className="mt-4">
            <PalettesContainer className="px-4 card-deck">
                {palettes.map(palette => (
                    <Card key={palette._id} className="border-0">
                        <Link
                            key={palette._id}
                            to={{
                                pathname: `/palettes/${palette._id}`
                            }}
                        >
                            <div className="d-flex rounded-top">
                                {palette.colors.map((color, index) => (
                                    <ColorSpan key={index} colorSize={palette.size} color={color} index={index} />
                                ))}
                            </div>
                        </Link>
                        <Card.Footer className="border rounded-bottom bg-white">
                            <h6>test</h6>
                        </Card.Footer>
                    </Card>
                ))}
            </PalettesContainer>
        </Container>
    );
}

export default withHeaderFooter(PaletteGalleryPage);