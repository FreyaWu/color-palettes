import React from 'react';
import tinyColor from 'tinycolor2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import ColorCode from './ColorCode';

const ColorBoxContainer = styled.div`
    width: 5rem;
    height: 5rem;
`;

function ColorTable({ colors }) {
    const tinyColors = colors.map(tinyColor);

    return (
        <Container fluid className="border border-bottom-0 border-left-0 border-right-0">
            {tinyColors.map((color, index) => (
                <Row className="py-2 align-items-center border border-top-0 border-left-0 border-right-0">
                    <Col xs={4} sm className="d-flex justify-content-center">
                        <ColorBoxContainer
                            className="rounded d-flex justify-content-center"
                            key={index}
                            style={{ border: "2px solid black" }}
                        >
                            <div
                                className="rounded w-100 h-100"
                                style={{
                                    backgroundColor: color.toRgbString(),
                                    border: "1px solid white"
                                }}
                            />
                        </ColorBoxContainer>
                    </Col>
                    <Col xs={8} sm className="d-flex justify-content-center">
                        <form>
                            <div className="d-flex">
                                <div className="font-weight-bold pr-1">
                                    {color.getAlpha() === 1 ?
                                        "HEX: " : "HEX8: "
                                    }
                                </div>
                                <ColorCode content={
                                    color.getAlpha() === 1 ?
                                        color.toHexString() : color.toHex8String()
                                }
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="font-weight-bold pr-1">
                                    {color.getAlpha() === 1 ?
                                        "RGB: " : "RGBA: "
                                    }
                                </div>
                                <ColorCode content={color.toRgbString()} />
                            </div>
                            <div className="d-flex">
                                <div className="font-weight-bold pr-1">HSL: </div>
                                <ColorCode content={color.toHslString()} />
                            </div>
                            <div className="d-flex">
                                <div className="font-weight-bold pr-1">HSV: </div>
                                <ColorCode content={color.toHsvString()} />
                            </div>
                        </form>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}

export default ColorTable;