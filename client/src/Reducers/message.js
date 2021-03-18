import {
    SET_MESSAGE,
    CLEAR_MESSAGE,
} from '../Actions/types';

const initialState = {};

const message = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return payload;
        case CLEAR_MESSAGE:
            return {
                message: ""
            };
        default:
            return state;
    }
}

export const selectMessage = state => state.message;

export default message;