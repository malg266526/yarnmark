import React from 'react';
import {Button} from './Button';

export const Header = () => {
  return (
    <div>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Wystawcy </Button>
      </a>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Organizatorzy </Button>
      </a>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Kontakt </Button>
      </a>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        Logo instagrama
      </a>
    </div>
  );
};
