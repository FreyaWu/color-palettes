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
    isLoggedIn: false,
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
                isLoggedIn: false,
                user: null
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload,
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        default:
            return state;
    }
}

export const selectAuth = state => state.auth;

export default auth;