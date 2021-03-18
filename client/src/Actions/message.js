import {
    SET_MESSAGE,
    CLEAR_MESSAGE
} from './types';

export const setMessage = (variant, message) => ({
    type: SET_MESSAGE,
    payload: { variant, message },
})

export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
})