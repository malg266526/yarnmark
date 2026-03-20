import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors, GrayScale, TextColors } from '../../../styles/theme';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { RedesignSpacings } from '../../../styles/spacings';
import { usePhone } from '../../../hooks/usePhone';
import { ScreenSize } from '../../../styles/screeen-size';
import { Picture } from '../../../components/Picture';
import { Typography } from '../../../components/Typography';
import { OrganizerDetailsCard } from '../../../components/OrganizerDetailsCard';
import { ORGANIZER_IMAGES, type OrganizerSlug } from '../../../configs/organizers';
import { BandsToggles } from '../../../toggles';

import loveKrakowPng from '../../../assets/team_and_partners/love_krakow.png';
import loveKrakowWebp from '../../../assets/team_and_partners/love_krakow.webp';
import loveKrakowAvif from '../../../assets/team_and_partners/love_krakow.avif';
import eskaSvg from '../../../assets/team_and_partners/ESKA_pantone_outline.svg';

const LayoutWithActiveOrganizer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  gap: ${RedesignSpacings.xxxl};
  margin-top: ${RedesignSpacings.lg};

  @media (max-width: ${ScreenSize.tablet}) {
    flex-direction: column-reverse;
    align-items: center;
    gap: ${RedesignSpacings.xl};
  }
`;

const OrganizersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${RedesignSpacings.lg};
  flex: 1;
  max-width: 650px;

  @media (max-width: ${ScreenSize.phone}) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: ${RedesignSpacings.md};
  }
`;

const AvatarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${RedesignSpacings.sm};
  transition: all 0.2s ease-in-out;
  padding: 0;

  img {
    border-radius: 50%;
    border: 5px solid ${({ $active }) => ($active ? '#793b3b' : GrayScale[100])};
    transition: all 0.3s ease;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.05);
    border-color: #793b3b;
  }

  ${Typography} {
    color: ${({ $active }) => ($active ? '#793b3b' : GrayScale[600])};
  }
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
`;

const LogoWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  opacity: 0.85;
  transition: all 0.3s ease;

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

const PARTNERS = [
  { name: 'Radio Eska', logo: { fallbackUrl: eskaSvg, sources: [] } },
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

const organizerSlugs = ['ewa', 'monia', 'karo', 'malgo', 'dagmara', 'justyna'] as readonly OrganizerSlug[];

export const TeamAndPartnersBand = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const detailRef = useRef<HTMLDivElement | null>(null);

  const [activeSlug, setActiveSlug] = useState<OrganizerSlug>(() => {
    const randomIndex = Math.floor(Math.random() * organizerSlugs.length);
    return organizerSlugs[randomIndex];
  });

  const onOrganizerClick = useCallback(
    (slug: OrganizerSlug) => {
      setActiveSlug(slug);
      if (isPhone) {
        detailRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [isPhone]
  );

  return (
    <Band.CenteredColumn
      id="team-and-partners"
      size="md"
      color={BackgroundColors.card}
      padding={isPhone ? 'lg' : 'xxxl'}
    >
      <Band.Title>{t('teamAndPartners.title')}</Band.Title>

      <LayoutWithActiveOrganizer>
        <div ref={detailRef}>
          <OrganizerDetailsCard
            name={t(`teamAndPartners.organizers.${activeSlug}.name`)}
            title={t(`teamAndPartners.organizers.${activeSlug}.title`)}
            description={t(`teamAndPartners.organizers.${activeSlug}.description`)}
            instagram={t(`teamAndPartners.organizers.${activeSlug}.instagram`)}
            image={ORGANIZER_IMAGES[activeSlug]}
          />
        </div>

        <OrganizersGrid>
          {organizerSlugs.map((slug) => (
            <AvatarButton key={slug} $active={activeSlug === slug} onClick={() => onOrganizerClick(slug)}>
              <Picture
                picture={ORGANIZER_IMAGES[slug]}
                alt={slug}
                width={isPhone ? 100 : 150}
                height={isPhone ? 100 : 150}
              />
              <NameGroup>
                <Typography size="md" weight="bold">
                  {t(`teamAndPartners.organizers.${slug}.name`)}
                </Typography>
                <Typography size="md" weight="regular" color={TextColors.secondary}>
                  {t(`teamAndPartners.organizers.${slug}.title`)}
                </Typography>
              </NameGroup>
            </AvatarButton>
          ))}
        </OrganizersGrid>
      </LayoutWithActiveOrganizer>

      {BandsToggles.partnersEnabled && (
        <>
          <Separator />
          <PartnersSection>
            <Typography size="lg" weight="bold" color={TextColors.secondary}>
              {t('teamAndPartners.mediaPartners')}
            </Typography>
            <PartnersLogos>
              {PARTNERS.map((partner) => (
                <LogoWrapper key={partner.name}>
                  <Picture picture={partner.logo} alt={partner.name} height={60} />
                </LogoWrapper>
              ))}
            </PartnersLogos>
          </PartnersSection>
        </>
      )}
    </Band.CenteredColumn>
  );
};
