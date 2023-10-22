import React from 'react';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Theme } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Header, StyledH2 } from './ContactPage.styled';
import styled from 'styled-components';
import { Spacings } from '../styles/spacings';

const LinkAnchorProps = {
  color: Theme.secondary
};

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: 20px;

  padding: ${Spacings.lg};
`;

export const WorkshopsPage = () => {
  const t = useTypedTranslation();

  return (
    <div>
      <Header>
        <StyledH2>{t('workshopsPage.title')}</StyledH2>

        <Menu iconColor={Theme.secondary}>
          <Link href="/home" anchorProps={LinkAnchorProps}>
            {t('menu.home')}
          </Link>

          <Link href="/vendors" anchorProps={LinkAnchorProps}>
            {t('menu.vendors')}
          </Link>

          <Link href="/contact" anchorProps={LinkAnchorProps}>
            {t('menu.contact')}
          </Link>
        </Menu>
      </Header>

      <Content></Content>
    </div>
  );
};
