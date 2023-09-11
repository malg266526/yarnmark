import React from 'react';
import {Button} from './components/Button';
import {Header} from './components/Header';

export const MainPage = () => (
  <div>
    <Header />
    <h1>Yarnmark</h1>
    <h2> Kraków</h2>
    <h3> 27.04</h3>
    <h3> Stara Zajezdnia</h3>
    <h4>Świętego Wawrzyńca 12</h4>

    <a href="https://google.com" target="_blank" rel="noreferrer">
      <Button> Kup Bilet </Button>
    </a>
  </div>
);
