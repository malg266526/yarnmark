import React from 'react';
import styled, { css } from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors, GrayScale, TextColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { RedesignSpacings } from '../../../styles/spacings';
import { usePhone } from '../../../hooks/usePhone';
import { Typography } from '../../../components/Typography';
import { Picture } from '../../../components/Picture';
import { ScreenSize } from '../../../styles/screeen-size';

import loveKrakowPng from '../../../assets/team_and_partners/love_krakow.png';
import loveKrakowWebp from '../../../assets/team_and_partners/love_krakow.webp';
import loveKrakowAvif from '../../../assets/team_and_partners/love_krakow.avif';
import eskaSvg from '../../../assets/team_and_partners/ESKA_pantone_outline.svg';

// Team faces
import ewaAvif from '../../../assets/team_and_partners/ewa_face.avif';
import ewaWebp from '../../../assets/team_and_partners/ewa_face.webp';
import ewaJpg from '../../../assets/team_and_partners/ewa_face.jpg';

import moniaAvif from '../../../assets/team_and_partners/monia_face.avif';
import moniaWebp from '../../../assets/team_and_partners/monia_face.webp';
import moniaJpg from '../../../assets/team_and_partners/monia_face.jpg';

import karoAvif from '../../../assets/team_and_partners/karo_face.avif';
import karoWebp from '../../../assets/team_and_partners/karo_face.webp';
import karoJpeg from '../../../assets/team_and_partners/karo_face.jpeg';

import malgoAvif from '../../../assets/team_and_partners/malgo_face.avif';
import malgoWebp from '../../../assets/team_and_partners/malgo_face.webp';
import malgoJpg from '../../../assets/team_and_partners/malgo_face.jpg';

import dagmaraAvif from '../../../assets/team_and_partners/dagmara_face.avif';
import dagmaraWebp from '../../../assets/team_and_partners/dagmara_face.webp';
import dagmaraJpg from '../../../assets/team_and_partners/dagmara_face.jpg';

import justynkaAvif from '../../../assets/team_and_partners/justynka_face.avif';
import justynkaWebp from '../../../assets/team_and_partners/justynka_face.webp';
import justynkaJpg from '../../../assets/team_and_partners/justynka_face.jpg';

const ORGANIZERS = [
  {
    name: 'Ewa',
    instagram: 'evvoola',
    image: {
      fallbackUrl: ewaJpg,
      sources: [
        { type: 'image/avif', url: ewaAvif },
        { type: 'image/webp', url: ewaWebp }
      ]
    }
  },
  {
    name: 'Monia',
    instagram: 'made_me_knit',
    image: {
      fallbackUrl: moniaJpg,
      sources: [
        { type: 'image/avif', url: moniaAvif },
        { type: 'image/webp', url: moniaWebp }
      ]
    }
  },
  {
    name: 'Karo',
    instagram: 'pannaodszydelka',
    image: {
      // Karo has a .jpeg fallback
      fallbackUrl: karoJpeg,
      sources: [
        { type: 'image/avif', url: karoAvif },
        { type: 'image/webp', url: karoWebp }
      ]
    }
  },
  {
    name: 'Małgo',
    instagram: 'malgo_tylkoknit',
    image: {
      fallbackUrl: malgoJpg,
      sources: [
        { type: 'image/avif', url: malgoAvif },
        { type: 'image/webp', url: malgoWebp }
      ]
    }
  },
  {
    name: 'Dagmara',
    instagram: 'wloczykijki_sklep',
    image: {
      fallbackUrl: dagmaraJpg,
      sources: [
        { type: 'image/avif', url: dagmaraAvif },
        { type: 'image/webp', url: dagmaraWebp }
      ]
    }
  },
  {
    name: 'Justyna',
    instagram: 'wloczykijki_sklep',
    image: {
      // Files are named justynka_face.*
      fallbackUrl: justynkaJpg,
      sources: [
        { type: 'image/avif', url: justynkaAvif },
        { type: 'image/webp', url: justynkaWebp }
      ]
    }
  }
];

const PARTNERS = [
  {
    name: 'Radio Eska',
    logo: { fallbackUrl: eskaSvg, sources: [] }
  },
  {
    name: 'LoveKraków',
    logo: {
      fallbackUrl: loveKrakowPng,
      sources: [
        { type: 'image/avif', url: loveKrakowAvif },
        { type: 'image/webp', url: loveKrakowWebp }
      ]
    }
  }
];

export const TeamAndPartnersBand = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <Band.CenteredColumn
      id="team-and-partners"
      size="md"
      gap={isPhone ? 'md' : 'lg'}
      padding={isPhone ? 'lg' : 'xxxl'}
      color={BackgroundColors.card}
    >
      <Band.Title>{t('teamAndPartners.title')}</Band.Title>

      <OrganizersGrid>
        {ORGANIZERS.map((organizer) => (
          <OrganizerCard key={organizer.name} organizer={organizer} isPhone={isPhone} />
        ))}
      </OrganizersGrid>

      <Separator />

      <PartnersSection>
        <Typography size="lg" weight="bold" color={TextColors.secondary}>
          {t('teamAndPartners.mediaPartners')}
        </Typography>
        <PartnersLogos>
          {PARTNERS.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
        </PartnersLogos>
      </PartnersSection>
    </Band.CenteredColumn>
  );
};

const OrganizerCard = ({ organizer, isPhone }: { organizer: (typeof ORGANIZERS)[0]; isPhone: boolean }) => {
  const size = isPhone ? 100 : 120;

  return (
    <ProfileWrapper>
      <ProfilePicture picture={organizer.image} alt={organizer.name} width={size} height={size} />
      <Typography size="md" weight="bold">
        {organizer.name}
      </Typography>
      <InstagramLink
        href={`https://www.instagram.com/${organizer.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography size="sm" color="inherit">
          @{organizer.instagram}
        </Typography>
      </InstagramLink>
    </ProfileWrapper>
  );
};

const PartnerLogo = ({ partner }: { partner: (typeof PARTNERS)[0] }) => (
  <LogoWrapper>
    <Picture picture={partner.logo} alt={partner.name} height={60} />
  </LogoWrapper>
);

// --- Style ---

const commonTransition = css`
  transition: all 0.3s ease-in-out;
`;

const OrganizersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${RedesignSpacings.lg};
  width: 100%;
  max-width: 900px;

  @media (max-width: ${ScreenSize.phone}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${RedesignSpacings.md};
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${RedesignSpacings.xs};
`;

const ProfilePicture = styled(Picture)`
  img {
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${GrayScale[200]};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    ${commonTransition}
  }

  &:hover img {
    transform: scale(1.05);
    border-color: #793b3b;
  }
`;

const InstagramLink = styled.a`
  text-decoration: none;
  color: #793b3b;
  ${commonTransition}

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const Separator = styled.hr`
  width: 80%;
  border: 0;
  height: 1px;
  background-color: ${GrayScale[200]};
  margin: ${RedesignSpacings.xl} 0;
`;

const PartnersSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${RedesignSpacings.md};
`;

const PartnersLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${RedesignSpacings.xl};
  flex-wrap: wrap;

  @media (max-width: ${ScreenSize.phone}) {
    gap: ${RedesignSpacings.lg};
  }
`;

const LogoWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  opacity: 0.85;
  ${commonTransition}

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  img {
    height: 100%;
    width: auto;
    max-width: 200px;
    object-fit: contain;
  }
`;
