// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';//axios is a library, promise-based
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cover from './Components/Cover';
import ArtworkCard from './Components/ArtworkCard';
import './Stylesheets/App.scss';

function chunkArray(arr, size) {
  var groupedArray = [];
  for (let i = 0; i < arr.length; i += size) {
    groupedArray.push(arr.slice(i, i+size));
  }
  return groupedArray; //chunkArray(arr, 3)output: [[xx, xx, xx], [xx, xx, xx], ...]
}

function App() {
  const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        axios.get('/artworks')
            .then(res => {
                const artworks = res.data;
                setArtworks(artworks);//what doe it do?
            })
            .catch(console.log);
    }, []);//[]?

    const loading = artworks.length === 0;
    
  return (
      <Container fluid px-0>
            <Cover />
            <div className="artGallery">
            {loading ? "Loading" : chunkArray(artworks, 4).map(chunk => (//map chunks of artworks [xx, xx, xx] into each row
              <Row >
                {chunk.map(artwork => ( //map each artwork into cols
                  <Col>
                    <ArtworkCard artwork={artwork}/>
                  </Col>
                ))}
              </Row >
          ))}
          </div>
      </Container> 
  );
}

export default App;
