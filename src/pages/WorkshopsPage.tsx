import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { StyledH2 } from './ContactPage.styled';

const LinkAnchorProps = {
  color: Colors.spruce
};

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  justify-content: center;
  gap: ${Spacings.md};
  padding: ${Spacings.lg};
`;

export const WorkshopsPage = () => {
  const t = useTypedTranslation();

  return (
    <div>
      <Header>
        <StyledH2>{t('workshopsPage.title')}</StyledH2>

        <Menu iconColor={Colors.spruce}>
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
