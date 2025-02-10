import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { TextColors } from '../styles/theme';
import { faInstagram, faRavelry } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = styled(Button)`
  max-width: 100px;
  color: white;
  text-align: center;
`;

type Variant = 'instagram' | 'raverly' | 'self';

interface Props {
  variant: Variant;
  url?: string;
}

const InstagramIcon = <FontAwesomeIcon icon={faInstagram} color="white" fixedWidth />;

const RaverlyIcon = <FontAwesomeIcon icon={faRavelry} color={TextColors.accent} size="2xl" fixedWidth />;

const PersonalPageIcon = <FontAwesomeIcon icon={faCircleUser} color={TextColors.accent} size="2xl" fixedWidth />;

const VariantToIcon = {
  instagram: InstagramIcon,
  raverly: RaverlyIcon,
  self: PersonalPageIcon
};

export const SocialMediaLink = ({ variant, url }: Props) => {
  if (!url) return;

  return (
    <IconButton onClick={() => window.open(url, '_blank')} aria-label={`go_to_${url}`}>
      {VariantToIcon[variant]}
    </IconButton>
  );
};
