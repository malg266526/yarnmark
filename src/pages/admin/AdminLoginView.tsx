import React, { useState } from 'react';
import { Typography } from '../../components/Typography';
import { UtilityPageHeader } from '../../components/UtilityPageHeader';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import {
  AdminLoginCard,
  AdminLoginError,
  AdminLoginField,
  AdminLoginInput,
  AdminLoginRoot,
  AdminLoginSubmit
} from './AdminLogin.styled';

interface AdminLoginViewProps {
  onSubmit: (password: string) => boolean;
}

export const AdminLoginView = ({ onSubmit }: AdminLoginViewProps) => {
  const t = useTypedTranslation();
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isPasswordCorrect = onSubmit(password);

    setHasError(!isPasswordCorrect);
  };

  return (
    <AdminLoginRoot>
      <AdminLoginCard onSubmit={handleSubmit}>
        <UtilityPageHeader kicker={t('adminLogin.kicker')} title={t('adminLogin.title')} titleSize="xl" />

        <AdminLoginField>
          <Typography size="sm">{t('adminLogin.passwordLabel')}</Typography>
          <AdminLoginInput
            autoFocus
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setHasError(false);
            }}
          />
          {hasError ? <AdminLoginError>{t('adminLogin.error')}</AdminLoginError> : null}
        </AdminLoginField>

        <AdminLoginSubmit type="submit">{t('adminLogin.submit')}</AdminLoginSubmit>
      </AdminLoginCard>
    </AdminLoginRoot>
  );
};
