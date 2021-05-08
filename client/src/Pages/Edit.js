import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';// hook, subscribe the component to store
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { selectAuth } from '../Reducers/auth';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Plus, Dash } from 'react-bootstrap-icons';
import ColorPicker from '../Components/Color-picker/ColorPicker';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import PaletteService from '../Services/palette';
import { ColorDiv, ColorCol, ColorBoxContainer } from './Build';
import axios from 'axios';

const ColorBoxOverlay = styled.div`
    opacity: 0;
    transition: opacity 0.3s ease;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const ColorBox = styled.div`
    width: 95%;
    height: 95%;
    &:hover ${ColorBoxOverlay} {
        opacity: 0.8;
    }
`;

const AddColorButton = styled(Button)`
    width: 10%;
    height: 7vw;
    font-size: 4vw;
`;

const DeleteColorButton = styled(Button)`
    font-size: 1.5vw;
`;

function BuildPage() {
    const { user } = useSelector(selectAuth);
    const { paletteId } = useParams();
    const [palette, setPalette] = useState([]);
    const [colors, setColors] = useState([tinyColor.random()]);
    const [colorIndex, setColorIndex] = useState(0);
    const [image, setImage] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchPalette = async () => {
            const { data: palette } = await PaletteService.getPalette(paletteId);
            setPalette(palette);
            setColors(palette.colors.map(color => tinyColor(color)));
            setImage(palette.image);
        }
        fetchPalette();
    }, [paletteId]);

    const currentColor = () => {
        return colors[colorIndex];
    }

    const handleSelectColorBox = index => {
        setColorIndex(index);
    }

    const handleColorChange = color => {
        setColors([
            ...colors.slice(0, colorIndex),
            tinyColor(color.rgb),
            ...colors.slice(colorIndex + 1)
        ])
    }

    const handleDeleteColor = (e, index) => {
        e.stopPropagation();
        if (index === colorIndex) {
            setColorIndex(colorIndex - 1);
        }
        setColors(colors.filter((_, idx) => idx != index));
    }

    const handleAddColor = index => {
        if (colorIndex === 9) return;
        for (let i = 0; i < colors.length; i++) {
            if (i === colorIndex) continue;
            if (colors[i] === colors[colorIndex]) {
                return;
            }
        }
        setColors([...colors, currentColor()]);
        setColorIndex(colors.length);
    }

    const handleImageChange = e => {
        const image = e.target.value;
        setImage(image);
    }

    const handleUpdate = async e => {
        e.preventDefault();
        const newColors = colors.map(color => color.toRgbString())
        const newSize = newColors.length;
        // console.log(newColors);
        const { data: palette } = await PaletteService.editPalette(paletteId, newColors, image, newSize);
        // console.log(palette);
        setPalette(palette);
        history.replace('/palettes');
    }

    const renderLoggedIn = (
        <>
            <Container className="my-1 p-0">
                <div className="text-center font-weight-bold mb-1">
                    Artwork
                </div>
                <Form>
                    <Form.Group controlId="onlineImage" className="d-flex">
                        <Form.Control placeholder="Enter an image address (Optional)" onChange={handleImageChange} />
                    </Form.Group>
                </Form>
            </Container>
            <Container className="pb-3">
                {image !== "" &&
                    <div className="text-center font-weight-bold pb-2">
                        Preview
                    </div>
                }
                <Image src={image} fluid />
            </Container>
            <Container>
                <Button variant="dark" type="submit" block onClick={handleUpdate}>
                    Update
                </Button>
            </Container>
        </>
    )

    return (
        <>
            <Container fluid className="bg-light px-0 pb-5">
                < ColorDiv color={currentColor().toRgbString()} />
                <Container>
                    <ColorPicker
                        className="p-2"
                        color={currentColor().toRgb()}
                        onChange={handleColorChange}
                    />
                </Container>
                <Container className="d-flex">
                    <div className="font-weight-bold">Colors</div>
                    <div className="ml-auto pb-2">
                        <Plus size={25} style={{ cursor: "pointer" }} onClick={handleAddColor} />
                        {colors.length > 1 && <Dash size={25} style={{ cursor: "pointer" }} onClick={(e) => handleDeleteColor(e, colorIndex)} />}
                    </div>
                </Container>

                <Container className="border bg-white">
                    <Row>
                        {colors.map((color, index) => (
                            <ColorCol className="p-0">
                                <ColorBoxContainer
                                    className="rounded d-flex justify-content-center"
                                    key={index}
                                    style={{ borderStyle: index === colorIndex ? "solid" : "none", borderColor: "black", borderWidth: "2px" }}
                                    onClick={() => handleSelectColorBox(index)}
                                >
                                    <div
                                        className="rounded w-100 h-100"
                                        style={{
                                            backgroundColor: color.toRgbString(),
                                            border: "1px solid white"
                                        }}
                                    />
                                </ColorBoxContainer>
                            </ColorCol>
                        ))}
                    </Row>
                </Container>
                {user && renderLoggedIn}
            </Container>
        </>
    );
}

export default withHeaderFooter(BuildPage);
