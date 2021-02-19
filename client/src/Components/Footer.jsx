import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    margin-top: auto;
    flex-shrink: 0;
`;
function Footer() {
    return (
        <FooterContainer className="bg-dark text-light text-center">
            <div>
                <span className="text">&copy; Color-Palette {new Date().getFullYear()}</span>
            </div>
        </FooterContainer>
    );
}

export default Footer;