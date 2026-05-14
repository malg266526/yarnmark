import React, { useEffect, useMemo, useState } from 'react';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';
import { InfoLabel, InfoRow, InfoValue } from '../VendorFormPage.styled';

export const SubmissionDateTimePreview = () => {
  const t = useTypedTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formatted = useMemo(
    () =>
      new Intl.DateTimeFormat(t.i18n.language, {
        dateStyle: 'long',
        timeStyle: 'medium'
      }).format(now),
    [now, t.i18n.language]
  );

  return (
    <InfoRow aria-label="submission_datetime">
      <InfoLabel>{t('vendorsFormPage.submissionDateTimeLabel')}</InfoLabel>
      <InfoValue>{formatted}</InfoValue>
    </InfoRow>
  );
};
