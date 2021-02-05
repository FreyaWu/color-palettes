const axios = require('axios');

export const getImg = async () => {
    try {
        const route = await axios.get('/artworks');
        return route.data;
    } catch (e) {
        console.log(e);
    }
    
}