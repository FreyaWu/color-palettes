import React from 'react';
import tinyColor from 'tinycolor2';
import styled from 'styled-components';
import ColorCode from './ColorCode';


const ColorBox = styled.div`
    height: 7rem;
    width: 7rem; 
    background-color: ${props => props.color};
`;

// const ColorCodeOverlay = style.div`
//     background-color: grey;
//     transition: opacity 0.3s ease;
//     overflow: auto;
//     width: 100%;
//     height: 100%
// `;

// const ColorCodeDiv = style(ColorCode)` 
//     &:hover ${ColorCodeOverlay} {
//         opacity: 0.8;
//     }     
// `;

function ColorCard(props) {
    const color = tinyColor(props.color);
    const { addGrowShrink } = props;

    return (
        <div style={{ flex: addGrowShrink ? "1 1 20%" : "0 0 20%" }}>
            <div className="d-flex justify-content-center">
                <ColorBox className="rounded-circle m-4" color={color} />
            </div>
            <div className="text-center mb-3">
                <form>
                    <ColorCode content={
                        color.getAlpha() === 1 ?
                            color.toHexString() : color.toHex8String()
                    }
                    />
                    <ColorCode content={color.toRgbString()} />
                    <ColorCode content={color.toHslString()} />
                    <ColorCode content={color.toHsvString()} />
                </form>
            </div>
        </div>
    );
}

export default ColorCard;