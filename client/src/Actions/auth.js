import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_MESSAGE,
} from './types';
import AuthService from '../Services/auth';

export const register = ({username, email, password}) => async (dispatch) => {
    try {
        const { data: user } = await AuthService.register(username, email, password);//after component dispatch(action), and before it arrives reducer
        await AuthService.login(username, password);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: user
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: {
                veriant: "danger",
                message: error.response.data && error.response.data.message
            }
        })
    };
};

export const login = ({username, password}) => async (dispatch) => {
    try {
        const { data: user } = await AuthService.login(username, password);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: {
                variant: "danger",
                message: error.response.data,
            }
        });
    }
};

export const logout = () => async (dispatch) => {
    await AuthService.logout();
    dispatch({
        type: LOGOUT,
    });

    dispatch({
        type: SET_MESSAGE,
        payload: {
            variant: "info",
            message: "You have logged out."
        }
    })
};

export const fetchUser = () => async (dispatch) => {
    try {
        const { data: user } = await AuthService.fetchUser();
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: user,
        });
    } catch (error) {
        dispatch({
            type: FETCH_USER_FAIL,
        });
    }
};