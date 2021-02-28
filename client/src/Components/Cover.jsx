import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CoverContainer = styled.div `
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9) 100%;
    // background-image: -webkit-linear-gradient(top,
    //         rgba(17, 16, 16, 1) 0%,
    //         rgba(0, 0, 0, 0) 20%,
    //         rgba(0, 0, 0, 0) 80%,
    //         rgba(17, 16, 16, 1) 100%),
    //     url(https://source.unsplash.com/collection/9248817);
    background-image: url(https://source.unsplash.com/collection/9248817);

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    // box-shadow: 0 0 0px 50px rgba(0, 0, 0, 0.9) 100%;
`;
function Cover() {
    return (
        <CoverContainer className="cover"></CoverContainer>
    )
}

export default Cover;
