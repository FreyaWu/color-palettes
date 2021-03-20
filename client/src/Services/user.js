import axios from 'axios';
const API_URL = '/api/user/';

const getUserPalettes = () => {
    return axios.get(API_URL + 'palettes');
}

const getLikedPalettes = () => {
    return axios.get(API_URL + 'liked');
}

export default {
    getUserPalettes,
    getLikedPalettes
}