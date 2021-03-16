import axios from 'axios';

const API_URL = '/palettes/';

const getAllPalettes = () => {
    return axios.get(API_URL);
}

const getPalette = (paletteId) => {
    return axios.get(API_URL + paletteId);
}

const savePalette = (colors, image) => {
    return axios.post(API_URL, {
        colors: colors,
        image: image,
    });
}

const editPalette = (paletteId, colors, image, size) => {
    return axios.patch(API_URL + paletteId + '/edit', {
        colors: colors,
        image: image,
        size: size
    });
}

const deletePalette = (paletteId) => {
    return axios.delete(API_URL + paletteId);
}

export default {
    getAllPalettes,
    getPalette,
    savePalette,
    editPalette,
    deletePalette
};