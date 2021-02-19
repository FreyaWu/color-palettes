import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { HuePicker, AlphaPicker } from 'react-color';
import styled from 'styled-components';
import Color from 'color';

import withHeaderFooter from '../Hocs/withHeaderFooter';

const ColorContainer = styled(Container)`
    height: 100vh;
    background-color: ${props => props.color};
`;

const ColorDiv = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% / ${props => props.colorSize});
    height: 25rem;
    background-color: ${props => props.color};
`;

function BuildPage() {
    const [color, setColor] = useState({hex: "#29F2F2"});

    const handleChangeComplete = (color) => {
        // const tempColors = colors.slice();
        // tempColors[colors.length] = color.hex;
        setColor({hex: color.hex, r: color.rgb.r, g: color.rgb.g, b: color.rgb.b});
    };

    return (
        <ColorContainer fluid color={color.hex}>
            {/* <div className="d-flex">
                <ColorDiv color={color} colorSize={1}></ColorDiv>
            </div> */}
            <div className="d-flex flex-column border mt-3" style={{ backgroundColor: 'white' }}>
                <HuePicker
                    className="w-75 align-self-center my-2"
                    height={'2rem'}
                    color={color.hex}
                    onChangeComplete={handleChangeComplete}
                />
                <AlphaPicker
                    className="w-75 align-self-center my-2"
                    height={'2rem'}
                    color={color.hex}
                    onChangeComplete={handleChangeComplete}
                />
            </div>
            <div className="d-flex border">
                <Form.Label>Hex</Form.Label>
                <Form.Control type="text" value={color.hex} />
                <Form.Label>R</Form.Label>
                <Form.Control type="text" value={color.r} />
                <Form.Label>G</Form.Label>
                <Form.Control type="text" value={color.g} />
                <Form.Label>B</Form.Label>
                <Form.Control type="text" value={color.b} />
            </div>
        </ColorContainer>
    );
}

export default withHeaderFooter(BuildPage);

