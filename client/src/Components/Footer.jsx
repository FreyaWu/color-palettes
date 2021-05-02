import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
`;
function Footer() {
    return (
        <FooterContainer className="mt-auto bg-dark text-light text-center">
            <div>
                <span className="text">&copy; Color Palettes {new Date().getFullYear()}</span>
            </div>
        </FooterContainer>
    );
}

export default Footer;