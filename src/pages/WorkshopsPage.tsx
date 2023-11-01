import React from 'react';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { FlexColumnLayout } from '../components/FlexColumnLayout';
import { Header } from '../components/Header';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Page, PageContent } from '../components/PageContent';
import { PageTitle } from '../components/PageTitle';
import { Spacings } from '../styles/spacings';
import { Colors } from '../styles/theme';
import { useTypedTranslation } from '../translations/useTypedTranslation';

const LinkAnchorProps = {
  color: Colors.spruce
};

export const FlexLayout = styled.div`
  display: flex;
  gap: ${Spacings.md};
`;

export const WorkshopsPage = () => {
  const t = useTypedTranslation();

  return (
    <Page>
      <Header>
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

      <PageTitle>{t('workshopsPage.title')}</PageTitle>

      <PageContent>
        <FlexLayout>
          <FlexColumnLayout>
            <Card>Pokaz pierwszej pomocy</Card>
            <Card>Żakard</Card>
            <Card>Szydełkowy koszyk</Card>
          </FlexColumnLayout>

          <FlexColumnLayout>
            <Card>Szydełko tunezyjskie</Card>
            <Card>Warsztat X</Card>
            <Card>Warsztat Y</Card>
          </FlexColumnLayout>
        </FlexLayout>
      </PageContent>
    </Page>
  );
};
