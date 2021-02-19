// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './Stylesheets/App.scss';

import HomePage from './Pages/Home';
import RegisterPage from './Pages/Register';
import BuildPage from './Pages/Build';
import GalleryPage from './Pages/Gallery';
import PalettePage from './Pages/PaletteGallery';
import ArtworkPage from './Pages/Artwork';

import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;    
`;

function RouterSwitch() {
  return (
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/register' component={RegisterPage}/>
        <Route exact path='/build' component={BuildPage}/>
        <Route exact path='/gallery' component={GalleryPage}/>
        <Route exact path='/palettes' component={PalettePage}/>
        <Route exact path='/artworks/:id' component={ArtworkPage}/>
      </Switch>
      </BrowserRouter>
  );
}

function App() {
  return (
    <MainContainer>
      <BrowserRouter>
        <RouterSwitch />
      </BrowserRouter>
    </MainContainer>
  );
}


export default App;
