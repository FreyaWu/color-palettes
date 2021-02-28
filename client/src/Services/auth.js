import axios from 'axios';

const API_URL = "/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "register", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios.post(API_URL + "login", {
        username,
        password,
    });
};

const fetchUser = () => {
    return axios.get(API_URL + "current-user");
};

const logout = () => {
    return axios.get(API_URL + "logout");
};

export default {
    register,
    login,
    fetchUser,
    logout,
};