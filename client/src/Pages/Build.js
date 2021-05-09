import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';// hook, subscribe the component to store
import { Link, useLocation, useHistory } from 'react-router-dom';
import { selectAuth } from '../Reducers/auth';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Plus, Dash } from 'react-bootstrap-icons';
import ColorPicker from '../Components/Color-picker/ColorPicker';
import { setMessage } from '../Actions/message';
import withHeaderFooter from '../Hocs/withHeaderFooter';
import PaletteService from '../Services/palette';
import MessageAlert from '../Components/MessageAlert';
import { device } from '../device';


export const ColorDiv = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 25vh;
    background-color: ${props => props.color};
`
const ColorBoxOverlay = styled.div`
    opacity: 0;
    transition: opacity 0.3s ease;
    overflow: auto;
    width: 100%;
    height: 100%
`;

export const ColorCol = styled(Col)`
    @media ${device.tablet} {
        flex: 0 0 10%;
    }
`;

export const ColorBoxContainer = styled.div`
    width: 100%;
    height: 2.5rem;
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
    const dispatch = useDispatch();
    const [colors, setColors] = useState([tinyColor.random()]);
    const [colorIndex, setColorIndex] = useState(0);
    const [image, setImage] = useState("");
    const history = useHistory();

    console.log(colors);
    console.log(colorIndex);

    useEffect(() => {
        document.body.classList.add('bg-light');
    }, []);

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

    const handleAddColor = () => {
        if (colorIndex === 9) {
            dispatch(setMessage("danger", "Maximum 10 colors."));
            return;
        }
        for (let i = 0; i < colors.length; i++) {
            if (i === colorIndex) continue;
            if (colors[i].toHex8String() === currentColor().toHex8String()) {
                dispatch(setMessage("danger", `Color ${currentColor().toHex8String()} already exists.`));
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

    const handleSubmit = async e => {
        e.preventDefault();
        const colorArray = colors.map(color => color.toRgbString())
        // console.log(colorArray);
        await PaletteService.savePalette(colorArray, image);
        history.replace('/palettes');
    }

    const renderLoggedIn = (
        <>
            <Container className="my-1 p-0">
                <div className="text-center font-weight-bold mb-1">
                    Artwork
                </div>
                <Form>
                    <div className="mb-3">
                        <Form.Group controlId="onlineImage" className="d-flex">
                            <Form.Control placeholder="Enter an image address (Optional)" onChange={handleImageChange} />
                        </Form.Group>
                    </div>
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
                <Button variant="dark" type="submit" block onClick={handleSubmit}>
                    Upload
                </Button>
            </Container>
        </>
    )

    return (
        <>
            <MessageAlert />
            <Container fluid className="bg-light px-0 pb-5 h-100">
                <ColorDiv color={currentColor().toRgbString()} />

                <Container className="justify-content-center">
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

                {/* <Container className="border bg-white px-0">
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
                                            <DeleteColorButton
                                                className="my-auto"
                                                variant="dark"
                                                onClick={(e) => handleDeleteColor(e, cIdx)}//added e
                                            >
                                                X
                                                </DeleteColorButton>
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
                </Container> */}
                {user && renderLoggedIn}
            </Container>
        </>
    );
}

export default withHeaderFooter(BuildPage);

