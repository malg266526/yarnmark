import React from 'react';
import styled from 'styled-components';
import { BackgroundColors, Colors, TextColors } from '../styles/theme';
import { Header } from './menu/Header';
import { PageContent } from '../components/PageContent';
import { Band } from '../components/bands/Band';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { usePhone } from '../hooks/usePhone';
import { PlainInfo } from './for-vendors/ForVendorsPage.styled';
import { UtilityPageHeader } from '../components/UtilityPageHeader';
import { Typography } from '../components/Typography';
import { RedesignSpacings } from '../styles/spacings';
import { Radius as CardRadius, DropShadow as CardShadow } from '../styles/cards';
import { Trans } from 'react-i18next';

const Link = styled.a`
  color: ${TextColors.accent};
  text-decoration: none;
`;

const StatuteStack = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.md};
`;

const IntroBadge = styled.div`
  width: fit-content;
  padding: 6px 12px;
  border-radius: ${CardRadius.xxl};
  background: ${BackgroundColors.green.light};
  color: ${TextColors.secondary};
`;

const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${RedesignSpacings.sm};
  padding: ${RedesignSpacings.md};
  background: ${Colors.white};
  border-radius: ${CardRadius.xl};
  box-shadow: ${CardShadow.card};
`;

const SectionHeading = styled.div`
  padding-bottom: ${RedesignSpacings.xs};
  border-bottom: 1px solid rgba(50, 98, 19, 0.18);
`;

const StatuteContent = styled(PlainInfo)`
  min-height: auto;
  max-width: none;

  ol {
    line-height: 22px;
  }
`;

const CenteredH2 = styled.h3`
  text-align: center;
  margin: 0;
`;

export const VendorStatutePage = () => {
  const t = useTypedTranslation();
  const isPhone = usePhone();

  return (
    <PageContent variant="wide" padding="none">
      <Header />

      <Band.NarrowColumn
        id="vendors_statute_content"
        gap="lg"
        size="xs"
        color={BackgroundColors.navigationBand}
        stretchOnMobile
        padding={isPhone ? 'sm' : 'xxl'}
      >
        <StatuteStack>
          <UtilityPageHeader kicker="Dla wystawców" title={t('menu.statuteForVendors')} />

          <IntroBadge>
            <Typography size="xs">Czytaj przed wysłaniem formularza</Typography>
          </IntroBadge>

          <SectionCard>
            <SectionHeading>
              <Typography size="xl" weight="bold">
                {t('vendorsStatue.title')}
              </Typography>
            </SectionHeading>

            <StatuteContent>
              <Typography size="md">{t('vendorsStatue.intro')}</Typography>
              <p>{t('vendorsStatue.explanationIntro')}</p>
              <ol>
                <li>
                  <Trans i18nKey="vendorsStatue.explanation1" />
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.explanation2" />
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.explanation3" />
                </li>
                <li>
                  <Trans
                    i18nKey="vendorsStatue.explanation4"
                    components={[
                      <Link
                        key="application_form_url"
                        target="_blank"
                        href="https://docs.google.com/forms/d/1v33Xps7qGVO9jwpa-iAj5vjQM70gjz2HFksviCHichs/edit"
                        aria-label="applicationForm"
                        style={{ pointerEvents: 'none' }}
                      />
                    ]}
                  />
                </li>
              </ol>

              <CenteredH2>{t('vendorsStatue.subtitle')}</CenteredH2>

              <ol>
                <li>{t('vendorsStatue.condition1')}</li>
                <li>{t('vendorsStatue.condition2')}</li>
                <li>{t('vendorsStatue.condition3')}</li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition4" />
                  <ul>
                    <li>{t('vendorsStatue.subcondition4a')}</li>
                    <li>{t('vendorsStatue.subcondition4b')}</li>
                    <li>{t('vendorsStatue.subcondition4c')}</li>
                  </ul>
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition5" />
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition6" />
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition7" />
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition8" />
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition9" />
                  <ul>
                    <li>{t('vendorsStatue.subcondition9a')}</li>
                    <li>{t('vendorsStatue.subcondition9b')}</li>
                    <li>
                      <Trans i18nKey="vendorsStatue.subcondition9c" />
                    </li>
                  </ul>
                </li>
                <li>
                  <Trans i18nKey="vendorsStatue.condition10" />
                </li>
              </ol>
            </StatuteContent>
          </SectionCard>
        </StatuteStack>
      </Band.NarrowColumn>
    </PageContent>
  );
};
