import axios from 'axios';

const API_URL = '/api/palettes/';

const getAllPalettes = () => {
    return axios.get(API_URL);
}

const getPalette = (paletteId) => {
    return axios.get(API_URL + paletteId);
}

const getPaletteViews = (paletteId) => {
    return axios.get(API_URL + paletteId + '/views');
}

const updatePaletteViews = (paletteId, views) => {
    return axios.patch(API_URL + paletteId + '/views', {
        views: views,
    });
}

const savePalette = (colors, image) => {
    const views = 0;
    return axios.post(API_URL, {
        colors: colors,
        image: image,
        views: views
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
    getPaletteViews,
    updatePaletteViews,
    savePalette,
    editPalette,
    deletePalette
};