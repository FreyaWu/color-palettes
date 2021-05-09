import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useArtwork(id) {
    const [data, setData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/artworks/${id}`);
            setData(response.data);
        };
        fetchData();
    }, [id]); //只在id有更新的时候，useEffect更新 only rerun useEffect() when id changes
    return data;
}

export default useArtwork;