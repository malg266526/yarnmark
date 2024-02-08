import { Icon as IconifyIcon } from '@iconify/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import shipThemed from '../assets/images/ship-themed.svg';
import { Text } from '../pages/MainPage.styled';
import { Spacings } from '../styles/spacings';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { CruiseMap } from './CruiseMap';
import { CruiseTicket } from './CruiseTicket';
import { TransparentButton } from './TransparentButton';
import { FlexColumnLayout } from './FlexColumnLayout';

const Root = styled.div`
  display: flex;
  gap: ${Spacings.lg};
`;

const Table = styled.div`
  position: relative;
  width: 400px;
`;

const TicketButton = styled(TransparentButton)`
  position: absolute;
  right: 50px;
  top: 140px;
  z-index: 2;
`;

const CoctailButton = styled(TransparentButton)`
  position: absolute;
  top: 60px;
  left: 160px;
  z-index: 2;
`;

const InvitationButton = styled(TransparentButton)`
  position: absolute;
  top: 160px;
  z-index: 2;
  left: 100px;
`;

const TableIconWrapper = styled.div`
  position: absolute;
  bottom: -50px;
`;

export const TextH2 = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 0;
`;

export const Content = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  position: relative;
  min-height: 400px;

  align-items: flex-start;
  background-color: white;

  padding: ${Spacings.lg};
  gap: ${Spacings.md};

  border-radius: 4px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
`;

type OnTheTable = 'ticket' | 'coctail' | 'map';

export const ClickableTable = () => {
  const t = useTypedTranslation();

  const content = {
    ticket: <CruiseTicket />,
    coctail: (
      <FlexColumnLayout gap="sm" padding="none" align="flex-start">
        <Text>{t('cashmereTicketsBand.proseccoIntro')}</Text>
        <Text>{t('cashmereTicketsBand.prosecco')}</Text>
      </FlexColumnLayout>
    ),
    map: <CruiseMap />
  };

  const [currentContent, setCurrentContent] = useState<OnTheTable>('ticket');

  return (
    <Root>
      <Content>
        {content[currentContent]}

        <img
          src={shipThemed}
          width={200}
          style={{
            opacity: 0.5,
            filter: 'grayscale(0.5)',
            position: 'absolute',
            right: '24px',
            bottom: '24px'
          }}
        />
      </Content>

      {/*       <div>
        <IconifyIcon icon="icon-park:ticket" width={100}></IconifyIcon>
        <IconifyIcon icon="fluent-emoji-high-contrast:ticket" width={100} style={{ color: '#6f81a5' }} />
        <IconifyIcon icon="codicon:book" width={100} style={{ color: '#32814d' }} />

        <IconifyIcon icon="emojione-monotone:open-book" width={100} style={{ color: '#155b37' }}></IconifyIcon>
      </div> */}

      <Table>
        <TicketButton onClick={() => setCurrentContent('ticket')}>
          <IconifyIcon icon="noto-v1:ticket" width={100} style={{ color: '#6f81a5' }}></IconifyIcon>
        </TicketButton>

        <CoctailButton onClick={() => setCurrentContent('coctail')}>
          <IconifyIcon icon="pepicons-print:coctail" width={100} style={{ color: '#d1d425' }} />
        </CoctailButton>

        <InvitationButton onClick={() => setCurrentContent('map')}>
          {/* <IconifyIcon icon="emojione-v1:book2" width={80}></IconifyIcon> */}
          <IconifyIcon icon="noto:world-map" width={80}></IconifyIcon>
        </InvitationButton>

        <TableIconWrapper>
          <IconifyIcon icon="material-symbols:table-bar" width={400} style={{ color: '#84673e' }}></IconifyIcon>
        </TableIconWrapper>
      </Table>
    </Root>
  );
};
