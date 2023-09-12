import React from 'react';
import { Button } from './components/Button';
import { Menu } from './components/Menu';
import YarnmarkLogo from './assets/images/yarnmark_logo.jpg';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  flex-direction: row;
`;

export const MainPage = () => (
  <div>
    <Menu />

    <Header>
      <div>
        <h1>Yarnmark</h1>
        <h2> Kraków</h2>
        <h3> 27.04</h3>
        <h3> Stara Zajezdnia</h3>
        <h4>Świętego Wawrzyńca 12</h4>
      </div>
      <img src={YarnmarkLogo} alt="logo" />
    </Header>

    <a href="https://google.com" target="_blank" rel="noreferrer">
      <Button> Kup Bilet </Button>
    </a>
  </div>
);
