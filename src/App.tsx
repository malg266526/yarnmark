import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ContactPage } from './pages/ContactPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }
`;

export const App = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/contact" element={<ContactPage />} />\{' '}
    </Routes>
  </BrowserRouter>
);
