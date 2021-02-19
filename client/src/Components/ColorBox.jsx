import React from 'react';

function ColorBox(props) {
    return (
        //display:'block'
        <span className = "colorbox" style={{backgroundColor:props.color}}></span>
    )
}

export default ColorBox;