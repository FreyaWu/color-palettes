import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
} from '../Actions/types';

const initialState = {
    user: {},
}

const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case FETCH_USER_FAIL:
            return {
                ...state,
                user: ""
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: payload,
            }
        case LOGOUT:
            return {
                ...state,
                user: ""
            }
        default:
            return state;
    }
}

export const selectAuth = state => state.auth;

export default auth;