import React from 'react';
import {Button} from './components/Button';
import {Header} from './components/Header';

export const MainPage = () => (
  <div>
    <Header />
    Yarnmark
    <a href="https://google.com" target="_blank" rel="noreferrer">
      <Button> Kup Bilet </Button>
    </a>
  </div>
);
