import React from 'react';
import { Button } from './components/Button';
import { Menu } from './components/Menu';
import YarnmarkLogo from './assets/images/yarnmark_logo.jpg';
import styled from 'styled-components';
import { Theme } from './styles/theme';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${Theme.secondary};
  padding-right: 48px;
  padding-left: 48px;
  padding-top: 4px;
  padding-bottom: 24px;
`;

const Logo = styled.img`
  align-self: center;
  margin-top: 48px;
`;

const TicketButton = styled.a`
  align-self: center;
`;

const Details = styled.div`
  font-family: 'Roboto';
  font-weight: 300;
`;

const StyledH3 = styled.h3`
  font-weight: 300;
`;

const StyledH4 = styled.h4`
  font-weight: 300;
`;

export const MainPage = () => (
  <div>
    <Header>
      <Menu />

      <Logo width={300} src={YarnmarkLogo} alt="logo" />

      <TicketButton href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Kup Bilet </Button>
      </TicketButton>
    </Header>

    <Details>
      <h2> Kraków</h2>
      <StyledH3> 27.04</StyledH3>
      <StyledH3> Stara Zajezdnia</StyledH3>
      <StyledH4>Świętego Wawrzyńca 12</StyledH4>
    </Details>
  </div>
);
