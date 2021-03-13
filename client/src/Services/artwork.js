import axios from 'axios';
import palette from './palette';

const API_URL = '/artworks/';

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