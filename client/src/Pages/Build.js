import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';// hook, subscribe the component to store
import { selectAuth } from '../Reducers/auth';
import { useLocation, useHistory } from 'react-router-dom';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import { device } from '../device';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Plus, Dash, Clipboard } from 'react-bootstrap-icons';
import ColorPicker from '../Components/Color-picker/ColorPicker';
import { setMessage } from '../Actions/message';
import PaletteService from '../Services/palette';

import MessageAlert from '../Components/MessageAlert';
import withHeaderFooter from '../Hocs/withHeaderFooter';

const ColorDiv = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 25vh;
    background-color: ${props => props.color};

    @media ${device.tablet} {
        height: 30vh;
    }
`
const ColorBoxContainer = styled.div`
    width: 100%;
    height: 3rem;
    cursor: pointer;

    @media ${device.tablet} {
        height: 4.5rem;
    }

    @media ${device.laptop} {
        height: 5.5rem;
    }

    @media ${device.laptopL} {
        height: 6.5rem;
    }
`;

const ColorBox = styled.div`
    width: 99%;
    height: 99%;
`;

const ColorCol = styled(Col)`
    @media ${device.tablet} {
        flex: 0 0 10%;
    }
`

const ImagePreviewContainer = styled(Container)`
    border-radius: 8px;
    border: dashed 2px #ccc;
    min-height: 10vh;
    padding: 0px;
`;

const PreviewImage = styled(Image)`
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

function BuildPage() {
    const { user } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const [colors, setColors] = useState([tinyColor.random()]);
    const [currentColor, setCurrentColor] = useState(0);
    const [image, setImage] = useState("");
    const history = useHistory();

    useEffect(() => {
        document.body.classList.add('bg-light');
    }, []);

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

    const handleSubmit = async e => {
        e.preventDefault();
        const colorArray = colors.map(color => color.toRgbString());
        await PaletteService.savePalette(colorArray, image);
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
                <Button variant="dark" type="submit" block onClick={handleSubmit}>
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

                <MessageAlert />

                <Container className="d-flex">
                    <div className="font-weight-bold">Colors</div>
                    <div className="ml-auto d-flex">
                        <Plus size={20} style={{ cursor: "pointer" }} onClick={handleAddColor} />
                        {colors.length > 1 &&
                            <Dash size={20} style={{ cursor: "pointer" }} onClick={(e) => handleDeleteColor(e, currentColor)} />
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
                                    <ColorBox
                                        className="my-auto rounded"
                                        style={{ backgroundColor: color.toRgbString() }}
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

