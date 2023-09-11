import React from 'react';
import {Button} from './Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

export const Menu = () => {
  return (
    <div>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Warsztaty </Button>
      </a>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Wystawcy </Button>
      </a>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Organizatorzy </Button>
      </a>

      <a href="https://google.com" target="_blank" rel="noreferrer">
        <Button> Kontakt </Button>
      </a>

      <a href="https://www.instagram.com/dziergamynapolu/" className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
};
