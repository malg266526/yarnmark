import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ContactPage } from './pages/ContactPage';
import styled, { createGlobalStyle } from 'styled-components';
import { VendorsPage } from './pages/VendorsPage';
import { WorkshopsPage } from './pages/WorkshopsPage';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }
`;

export const AppRoot = styled.div`
  height: 100vh;
`;

export const App = () => (
  <AppRoot>
    <GlobalStyle />
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vendors" element={<VendorsPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
      </Routes>
    </BrowserRouter>
  </AppRoot>
);
