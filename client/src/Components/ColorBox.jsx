import React from 'react';


function ColorBox(props) {
    return (
        <span className = "colorbox" style={{backgroundColor:props.color, display:'block'}}></span>
    )
}

export default ColorBox;