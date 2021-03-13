import React from 'react';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import ColorCode from './ColorCode';


const ColorBox = styled.div`
    height: 7rem;
    width: 7rem; 
    background-color: ${props => props.color};
`;

function ColorCard(props) {
    const color = tinyColor(props.color);

    return (
        <div style={{flex: "1 1 10%"}}>
            <div className="d-flex justify-content-center">
                <ColorBox className="rounded-circle m-4" color={color}/>
            </div>
            <div className="text-center mb-3">
                <form>
                    <ColorCode content={
                        color.getAlpha() === 1 ?
                        color.toHexString() : color.toHex8String()
                        }
                    />
                    <ColorCode content={color.toRgbString()}/>
                    <ColorCode content={color.toHslString()}/>
                    <ColorCode content={color.toHsvString()}/>
                </form>
            </div>
        </div>
    );
}

export default ColorCard;