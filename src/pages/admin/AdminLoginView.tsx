import React, { useState } from 'react';
import { Typography } from '../../components/Typography';
import { useTypedTranslation } from '../../translations/useTypedTranslation';
import {
  AdminLoginCard,
  AdminLoginError,
  AdminLoginField,
  AdminLoginInput,
  AdminLoginKicker,
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
        <AdminLoginKicker>
          <Typography size="xs">{t('adminLogin.kicker')}</Typography>
        </AdminLoginKicker>

        <Typography size="xl" weight="bold">
          {t('adminLogin.title')}
        </Typography>

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
