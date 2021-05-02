import { React, useState } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function ColorCode({ content }) {
    const [show, setShow] = useState(false);

    const renderTooltip = (props) => (
        <Tooltip id="tooltip" {...props}>
            Copied!
        </Tooltip>
    )

    const renderNothing = (props) => (
        <div />
    )

    const handleClickCode = (e) => {
        setShow(true);
        setTimeout(() => { setShow(false) }, 1000);
        const el = document.createElement('textarea');
        el.value = e.target.textContent;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    return (
        <OverlayTrigger
            placement="top"
            style={{ backgroundColor: "grey" }}
            delay={{ show: 250, hide: 400 }}
            overlay={show ? renderTooltip : renderNothing}
        >
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ cursor: "pointer" }}
                onClick={handleClickCode}
            >
                {content}
            </div>
        </OverlayTrigger>

    );
}

export default ColorCode;