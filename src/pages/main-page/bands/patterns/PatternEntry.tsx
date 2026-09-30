import React from 'react';
import { FlexColumnLayout } from '../../../../components/FlexColumnLayout';
import { Typography } from '../../../../components/Typography';
import { Link, SecondaryLink } from '../../../../components/Link';
import { useTypedTranslation } from '../../../../translations/useTypedTranslation';
import type { YarnmarkPattern } from './patternsConfig';

type PatternEntryProps = {
  pattern: YarnmarkPattern;
  isPhone: boolean;
};

export const PatternEntry = ({ pattern, isPhone }: PatternEntryProps) => {
  const t = useTypedTranslation();

  return (
    <FlexColumnLayout padding="none" gap="xxs">
      <Typography size={isPhone ? 'md' : 'lg'} weight="bold">
        {t(pattern.titleKey)}
      </Typography>

      {pattern.ravelryUrl && (
        <Link to={pattern.ravelryUrl} target="_blank" rel="noreferrer">
          {t('patternsBand.viewOnRavelry')}
        </Link>
      )}

      <Typography size="md">
        {t(pattern.author.labelKey)}
        {pattern.author.instagram && (
          <>
            {' '}
            <SecondaryLink to={pattern.author.instagram.url} target="_blank" rel="noreferrer">
              {pattern.author.instagram.handle}
            </SecondaryLink>
          </>
        )}
      </Typography>
    </FlexColumnLayout>
  );
};
