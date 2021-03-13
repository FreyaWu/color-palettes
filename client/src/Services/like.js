import axios from 'axios';

const API_URL = '/like/';

const getLikes = (paletteId) => {
    return axios.get(API_URL + paletteId + '/count');
};

const doesLikeExist = (paletteId) => {
    return axios.get(API_URL + paletteId);
};

const postLike = (paletteId) => {
    return axios.post(API_URL + paletteId);
}

const deleteLike = (paletteId) => {
    return axios.delete(API_URL + paletteId);
}

export default {
    getLikes,
    doesLikeExist,
    postLike,
    deleteLike
}