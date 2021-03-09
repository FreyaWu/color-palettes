import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
} from './types';
import AuthService from '../Services/auth';
import axios from "axios";


export const register = ({username, email, password}) => async (dispatch) => {
    try {
        const { data: user } = await AuthService.register(username, email, password);//after component dispatch(action), and before it arrives reducer
        dispatch({
            type: REGISTER_SUCCESS,
            payload: user
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = ({username, password}) => async (dispatch) => {
    try {
        console.log({username, password});
        const { data: user } = await AuthService.login(username, password);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user
        });
    } catch (error) {
        throw Error(error);
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const logout = () => async (dispatch) => {
    await AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
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