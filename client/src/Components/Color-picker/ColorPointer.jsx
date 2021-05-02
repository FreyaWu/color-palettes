import React from 'react';
import styled from 'styled-components';

const ColorPointerInner = styled.div`
    height: 28px;
    width: 8px;
    cursor: pointer;
    border: 2px solid white;
    border-radius: 5px;
`;

function ColorPointer() {
    return (
        <div style={{ border: "2px solid black", borderRadius: "5px" }}>
            <ColorPointerInner />
        </div>
    );
}

export default ColorPointer;