import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import MockLogo from './../assets/images/logo_wystawcy.png';
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

export const VendorsPage = () => {
  const t = useTypedTranslation();

  return (
    <div>
      <Header>
        <StyledH2>{t('vandorsPage.title')}</StyledH2>

        <Menu iconColor={Colors.spruce}>
          <Link href="/home" anchorProps={LinkAnchorProps}>
            {t('menu.home')}
          </Link>

          <Link href="/workshops" anchorProps={LinkAnchorProps}>
            {t('menu.workshops')}
          </Link>

          <Link href="/contact" anchorProps={LinkAnchorProps}>
            {t('menu.contact')}
          </Link>
        </Menu>
      </Header>

      <Content>
        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>

        <Link href="https://www.instagram.com/dziergamynapolu/" className="instagram_social">
          <img width={200} src={MockLogo} alt="wystawca1" />
        </Link>
      </Content>
    </div>
  );
};
