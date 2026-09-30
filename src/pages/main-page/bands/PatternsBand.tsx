import React from 'react';
import { Band } from '../../../components/bands/Band';
import { BackgroundColors } from '../../../styles/theme';
import { usePhone, useTablet } from '../../../hooks/usePhone';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { YARNMARK_PATTERNS } from './patterns/patternsConfig';
import { groupPatternsByEdition } from './patterns/patternsUtils';
import { EDITION_PHOTOS } from './patterns/patternsPictures';
import { PatternEntry } from './patterns/PatternEntry';
import {
  EditionKicker,
  EditionPanel,
  PanelBody,
  PanelEntries,
  PanelPhoto,
  PanelsRow
} from './patterns/PatternsBand.styled';

type PatternsBandType = {
  id: string;
};

export const PatternsBand = ({ id }: PatternsBandType) => {
  const t = useTypedTranslation();
  const isPhone = usePhone();
  const isTablet = useTablet();
  const editions = groupPatternsByEdition(YARNMARK_PATTERNS);

  return (
    <Band.CenteredColumn
      id={id}
      size="md"
      gap={isPhone ? 'sm' : 'lg'}
      padding={isPhone ? 'md' : 'xxxl'}
      color={BackgroundColors.navigationBand}
      justify="center"
    >
      <Band.Title>{t('patternsBand.title')}</Band.Title>

      <PanelsRow direction={isPhone ? 'column' : 'row'}>
        {editions.map(({ year, patterns }) => (
          <EditionPanel key={year} grow={EDITION_PHOTOS[year].ratio} isStacked={isPhone}>
            <PanelPhoto
              ratio={EDITION_PHOTOS[year].ratio}
              picture={EDITION_PHOTOS[year].picture}
              alt={t(EDITION_PHOTOS[year].altKey)}
            />
            <PanelBody>
              <EditionKicker>{t('patternsBand.edition', { year })}</EditionKicker>
              <PanelEntries isStacked={isTablet}>
                {patterns.map((pattern) => (
                  <PatternEntry key={pattern.id} pattern={pattern} isPhone={isPhone} />
                ))}
              </PanelEntries>
            </PanelBody>
          </EditionPanel>
        ))}
      </PanelsRow>
    </Band.CenteredColumn>
  );
};
