import React from 'react';
import { CustomPicker } from 'react-color'
import { Hue, Alpha, Saturation } from 'react-color/lib/components/common'
import ColorPickerFields from './ColorPickerFields';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from 'styled-components';

const SaturationContainer = style.div`
    width: 100%;
    height: 100%;
`;

const HueContainer = style.div`
    position: relative;
    width: 100%;
    height: 2rem;
`;

const AlphaContainer = style.div`
    position: relative;
    width: 100%;
    height: 2rem;
`;


function MyPicker({
    hex,
    hsl,
    hsv,
    rgb,
    onChange
}) {
    return (
        <Container fluid>
            <Row className="my-4">
                <Col xs={12} md className="mr-md-2 mb-2 mb-sm-0">
                    <SaturationContainer style={{ height: "10rem" }}>
                        <Saturation
                            hsl={hsl}
                            hsv={hsv}
                            onChange={onChange}
                        />
                    </SaturationContainer>
                </Col>
                <Col xs={12} md className="ml-md-2">
                    <Row className="mb-3">
                        <HueContainer>
                            <Hue
                                hsl={hsl}
                                onChange={onChange}
                            />
                        </HueContainer>
                    </Row>
                    <Row className="my-3">
                        <AlphaContainer>
                            <Alpha
                                rgb={rgb}
                                hsl={hsl}
                                onChange={onChange}
                            />
                        </AlphaContainer>
                    </Row>
                    <Row>
                        <ColorPickerFields
                            rgb={rgb}
                            hsl={hsl}
                            hex={hex}
                            onChange={onChange}
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomPicker(MyPicker);