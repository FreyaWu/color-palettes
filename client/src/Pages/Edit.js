import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';// hook, subscribe the component to store
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { selectAuth } from '../Reducers/auth';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ColorPicker from '../Components/Color-picker/ColorPicker';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import PaletteService from '../Services/palette';
import axios from 'axios';


const ColorDiv = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 25rem;
    background-color: ${props => props.color};
`
const ColorBoxOverlay = styled.div`
    opacity: 0;
    transition: opacity 0.3s ease;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const ColorBoxContainer = styled.div`
    width: 10%;
    height: 7rem;
    cursor: pointer;
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
    font-size: 4rem;
`;

function BuildPage() {
    const {user} = useSelector(selectAuth);
    const paletteId = useParams();
    const [palette, setPalette] = useState([]);
    const [colors, setColors] = useState([tinyColor.random()]);
    const [colorIndex, setColorIndex] = useState(0);
    const [image, setImage] = useState("");
    const history = useHistory();

    

    useEffect (() => {
        const fetchPalette = async() => {
            const {data: palette} = await PaletteService.editPalette(paletteId);
            setPalette(palette);
            setColors(palette.colors.map(color => tinyColor(color)));
            setImage(palette.image);
        }
        fetchPalette();
    },[paletteId]);

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
        e.stopPropagation();//
        setColors(colors.filter((_, idx) => idx != index));
        if (colorIndex > index) {
            setColorIndex(colorIndex - 1);
        }
    }

    const handleAddColor = index => {
        if (colorIndex === 9) return;
        for (let i = 0; i < colors.length; i++) {
            if (i === colorIndex) continue;
            if (colors[i] === colors[colorIndex]) {
                return;
            }
        }
        setColors([...colors, tinyColor.random()]);
        setColorIndex(colors.length);
    }

    const handleImageChange = e => {
        const image = e.target.value;
        setImage(image);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const colorArray = colors.map(color => color.toRgbString())
        console.log(colorArray);
        const newPalette = await axios.post('/palettes/', {colorArray, image});
        history.replace('/build');
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
                <Image src={image} fluid/>
            </Container>
            <Container>
                <Button variant="dark" type="submit" block onClick={handleSubmit}>
                    Upload
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
                <Container className="border bg-white px-0">
                    <div className="d-flex">
                        {colors.map((color, cIdx) => (
                            <ColorBoxContainer 
                                className="rounded d-flex justify-content-center"
                                key={cIdx}
                                style={{ borderStyle: cIdx === colorIndex ? "solid" : "none", borderColor: "black", borderWidth: "2px" }}
                                onClick={() => handleSelectColorBox(cIdx)}
                            >
                                <ColorBox
                                    className="my-auto rounded"
                                    style={{ backgroundColor: color.toRgbString() }}
                                >
                                    {cIdx !== colorIndex &&
                                            <ColorBoxOverlay className="d-flex justify-content-center">
                                                <Button
                                                    className="my-auto"
                                                    variant="dark"
                                                    onClick={(e) => handleDeleteColor(e, cIdx)}//added e
                                                >
                                                    X
                                                </Button>
                                            </ColorBoxOverlay>
                                        }
                                </ColorBox>
                            </ColorBoxContainer>
                        ))}
                        {colors.length < 10 &&
                                <AddColorButton
                                    className="border text-center border-0 rounded p-0"
                                    variant="light"
                                    onClick={handleAddColor}
                                >
                                    +
                            </AddColorButton>
                            }
                    </div>
                </Container>
                {user && renderLoggedIn}
            </Container>
        </>
    );
}

export default withHeaderFooter(BuildPage);
