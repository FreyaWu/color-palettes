import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';// hook, subscribe the component to store
import { useParams, useHistory } from 'react-router-dom';
import { selectAuth } from '../Reducers/auth';
import tinyColor from 'tinycolor2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Plus, Dash } from 'react-bootstrap-icons';
import { setMessage } from '../Actions/message';
import PaletteService from '../Services/palette';

import ColorPicker from '../Components/Color-picker/ColorPicker';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import { ColorDiv, ColorBoxContainer, ColorBox, ColorCol, ImagePreviewContainer, PreviewImage } from './Build';

function EditPage() {
    const { user } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const { paletteId } = useParams();
    const [colors, setColors] = useState([tinyColor.random()]);
    const [currentColor, setCurrentColor] = useState(0);
    const [image, setImage] = useState("");
    const history = useHistory();

    useEffect(() => {
        document.body.classList.add('bg-light');
    }, []);

    useEffect(() => {
        const fetchPalette = async () => {
            const { data: palette } = await PaletteService.getPalette(paletteId);
            setColors(palette.colors.map(color => tinyColor(color)));
            setImage(palette.image);
        }
        fetchPalette();
    }, [paletteId]);

    const getCurrentColor = () => {
        return colors[currentColor];
    }

    const handleSelectColorBox = index => {
        setCurrentColor(index);
    }

    const handleColorChange = color => {
        setColors([
            ...colors.slice(0, currentColor),
            tinyColor(color.rgb),
            ...colors.slice(currentColor + 1)
        ])
    }

    const handleDeleteColor = (e, index) => {
        if (index === colors.length - 1) {
            setCurrentColor(colors.length - 2);
        }
        setColors(colors.filter((_, idx) => idx !== index));
    }

    const handleAddColor = () => {
        if (currentColor === 9) {
            dispatch(setMessage("danger", "Maximum 10 colors."));
            return;
        }
        for (let i = 0; i < colors.length; i++) {
            if (i === currentColor) continue;
            if (colors[i] === getCurrentColor()) {
                dispatch(setMessage("danger", `Color ${getCurrentColor().toHex8String()} already exits.`));
                return;
            }
        }
        setColors([...colors, getCurrentColor()]);
        setCurrentColor(colors.length);
    }

    const handleImageChange = e => {
        const image = e.target.value;
        setImage(image);
    }

    const handleUpdate = async e => {
        e.preventDefault();
        const newColors = colors.map(color => color.toRgbString())
        const newSize = newColors.length;
        await PaletteService.editPalette(paletteId, newColors, image, newSize);
        history.replace('/palettes');
    }

    const renderLoggedIn = (
        <>
            <Container className="my-sm-1">
                <div className="font-weight-bold mb-1">
                    Artwork
                </div>
            </Container>
            <Container className="p-0">
                <Form>
                    <div className="mb-3">
                        <Form.Group controlId="onlineImage" className="d-flex">
                            <Form.Control placeholder="Enter an image address (Optional)" onChange={handleImageChange} />
                        </Form.Group>
                    </div>
                </Form>
            </Container>
            <ImagePreviewContainer className="d-flex flex-column flex-wrap justify-content-center align-content-center">
                {image ?
                    <PreviewImage src={image} /> :
                    <div className="text-muted">
                        <h2>Preview</h2>
                    </div>
                }
            </ImagePreviewContainer>
            <Container className="mt-3">
                <Button variant="dark" type="submit" block onClick={handleUpdate}>
                    Upload
                </Button>
            </Container>
        </>
    )

    return (
        <>
            <Container fluid className="bg-light px-0 pb-5">
                <ColorDiv color={getCurrentColor().toRgbString()} />

                <Container className="justify-content-center">
                    <ColorPicker
                        className="p-2"
                        color={getCurrentColor().toRgb()}
                        onChange={handleColorChange}
                    />
                </Container>

                <Container className="d-flex">
                    <div className="font-weight-bold">Colors</div>
                    <div className="ml-auto d-flex">
                        <Plus size={25} style={{ cursor: "pointer" }} onClick={handleAddColor} />
                        {colors.length > 1 &&
                            <Dash size={25} style={{ cursor: "pointer" }} onClick={(e) => handleDeleteColor(e, currentColor)} />
                        }
                    </div>
                </Container>

                <Container className="border bg-white">
                    <Row>
                        {colors.map((color, index) => (
                            <ColorCol className="p-0">
                                <ColorBoxContainer
                                    className="rounded d-flex justify-content-center"
                                    key={index}
                                    style={{ borderStyle: index === currentColor ? "solid" : "none", borderColor: "black", borderWidth: "2px" }}
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

export default withHeaderFooter(EditPage);
