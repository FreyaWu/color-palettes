import axios from 'axios';

const API_URL = '/api/artworks/';

const getAllArtworks = () => {
    return axios.get(API_URL);
}

const getPalette = (paletteId) => {
    return axios.get(API_URL + paletteId);
}

export default {
    getAllArtworks,
    getPalette
};