// import logo from './logo.svg';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser }from './Actions/auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './Stylesheets/App.scss';

import HomePage from './Pages/Home';
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';
import BuildPage from './Pages/Build';
import GalleryPage from './Pages/Gallery';
import PalettePage from './Pages/PaletteGallery';
import ShowPage from './Pages/Show';
import UserPage from './Pages/UserPage';
import EditPage from './Pages/Edit';

import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;    
`;


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <MainContainer>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/logout'/>
          <Route exact path='/build' component={BuildPage}/>
          <Route exact path='/gallery' component={GalleryPage}/>
          <Route exact path='/palettes' component={PalettePage}/>
          <Route exact path='/palettes/:paletteId' component={ShowPage}/>
          <Route exact path='/current-user' component={UserPage}/>
          <Route exact path='/palettes/:paletteId/edit' component={EditPage}/>
        </Switch>
      </BrowserRouter>
    </MainContainer>
  );
}


export default App;
