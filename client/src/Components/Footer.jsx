import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div>
                <span className="text">&copy; Color-Palette {new Date().getFullYear()}</span>
            </div>
        </footer>
    );
}

export default Footer;