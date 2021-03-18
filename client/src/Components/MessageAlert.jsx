import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage } from '../Reducers/message';
import { clearMessage } from '../Actions/message';

function MessageAlert({ autoDismiss = true }) {
    const { variant, message } = useSelector(selectMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (autoDismiss) {
            const timer = setTimeout(() => dispatch(clearMessage()), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div>
            { variant && 
                <Alert
                    variant = {variant}
                    onClose={() => { dispatch(clearMessage()) }}
                    dismissible
                >
                    {message}
                </Alert>}
        </div>
    )
}

export default MessageAlert;