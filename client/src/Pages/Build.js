import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HuePicker, AlphaPicker } from 'react-color';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import { useSelector } from 'react-redux';//? hook, subscribe the component to store
import { selectAuth } from '../Reducers/auth';

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
`

function BuildPage() {
    const randomColor = tinyColor.random();
    const [color, setColor] = useState(randomColor);
    const { isLoggedIn } = useSelector(selectAuth);

    const handleChangeCompleteHue = (newColor) => {
        // const tempColors = colors.slice();
        // tempColors[colors.length] = color.hex;
        setColor(tinyColor({...newColor.rgb, a:color.getAlpha()}));
    };
    const handleChangeCompleteAlpha = (newColor) => {
        // const tempColors = colors.slice();
        // tempColors[colors.length] = color.hex;
        setColor(tinyColor(newColor.rgb));
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(e.target);
        if (name === "hex") {
            console.log(value);
            setColor(tinyColor(value));
        } else if (name === "a") {
            let alpha = parseInt(value);
            if (isNaN(alpha) || alpha < 0 || alpha > 100) alpha = 0;
            setColor(tinyColor({...color.toRgb(), a:alpha/100}));
        } else {
            let num = parseInt(value);
            if (isNaN(num) || num < 0 || num > 255) num = 0;
            console.log({...color.toRgb(),[name]:num});
            setColor(tinyColor({...color.toRgb(),[name]:num}));//[] is neccessary, find value based on name
        }
    }
    return (
        <ColorContainer fluid color={color.toRgbString()}>
            {/* <div className="d-flex">
                <ColorDiv color={color} colorSize={1}></ColorDiv>
            </div> */}
            <div className="d-flex flex-column border mt-3" style={{ backgroundColor: 'white' }}>
                <HuePicker
                    className="w-75 align-self-center my-2"
                    height={'2rem'}
                    color={color.toRgb()}
                    onChangeComplete={handleChangeCompleteHue}
                />
                <AlphaPicker
                    className="w-75 align-self-center my-2"
                    height={'2rem'}
                    color={color.toRgb()}
                    onChangeComplete={handleChangeCompleteAlpha}
                />
            </div>
            <div className="d-flex border">
                <Form.Label>Hex</Form.Label>
                <Form.Control name="hex" type="text" value={color.toHexString()} onChange={handleChange}/>
                <Form.Label>R</Form.Label>
                <Form.Control name="r" type="text" value={color.toRgb().r} onChange={handleChange}/>
                <Form.Label>G</Form.Label>
                <Form.Control name="g" type="text" value={color.toRgb().g} onChange={handleChange}/>
                <Form.Label>B</Form.Label>
                <Form.Control name="b" type="text" value={color.toRgb().b} onChange={handleChange}/>
                <Form.Label>A</Form.Label>
                <Form.Control name="a" type="text" value={color.toRgb().a * 100} onChange={handleChange}/>
            </div>
            {isLoggedIn &&
                <div>
                    <Button variant="success">Save</Button>
                </div>
            }
        </ColorContainer>
    );
}

export default withHeaderFooter(BuildPage);

