import React, { useState } from 'react';
import styled from 'styled-components';
import { useTypedTranslation } from '../translations/useTypedTranslation';
import { Waves, Text } from '../pages/MainPage.styled';
import { WaveBox } from './WaveBox';
import { Icon as IconifyIcon } from '@iconify/react';
import { FlexColumnLayout } from './FlexColumnLayout';
import { Link } from './Link';
import { TransparentButton } from './TransparentButton';
import { Spacings } from '../styles/spacings';

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
  right: 40px;
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
  left: 50px;
`;

const TableIconWrapper = styled.div`
  position: absolute;
  bottom: -50px;
`;

type OnTheTable = 'invitation' | 'ticket' | 'coctail';

export const ClickableTable = () => {
  const t = useTypedTranslation();

  const content = {
    ticket: (
      <FlexColumnLayout>
        <Text>{t('cashmereTicketsBand.ticketDescription')}</Text>
        <Link to="https://wloczykijki.pl/pl/c/Krakoski-Yarnmark-Welny/355">{t('cashmereTicketsBand.buyTickets')}</Link>
      </FlexColumnLayout>
    ),
    coctail: <Text>{t('cashmereTicketsBand.prosecco')}</Text>,
    invitation: <Text>{t('cashmereTicketsBand.invitations')}</Text>
  };

  const [currentContent, setCurrentContent] = useState<OnTheTable>('invitation');

  return (
    <Root>
      <Waves>
        <WaveBox>{content[currentContent]}</WaveBox>
      </Waves>

      {/*      <div>
        <IconifyIcon icon="noto-v1:ticket" width={100} style={{ color: '#6f81a5' }}></IconifyIcon>
        <IconifyIcon icon="icon-park:ticket" width={100}></IconifyIcon>

        <IconifyIcon icon="emojione-v1:book2" width={100}></IconifyIcon>
        <IconifyIcon icon="emojione-monotone:open-book" width={100} style={{ color: '#155b37' }}></IconifyIcon>
      </div> */}

      <Table>
        <TicketButton onClick={() => setCurrentContent('ticket')}>
          <IconifyIcon icon="fluent-emoji-high-contrast:ticket" width={100} style={{ color: '#6f81a5' }} />
        </TicketButton>

        <CoctailButton onClick={() => setCurrentContent('coctail')}>
          <IconifyIcon icon="pepicons-print:coctail" width={100} style={{ color: '#d1d425' }} />
        </CoctailButton>

        <InvitationButton onClick={() => setCurrentContent('invitation')}>
          <IconifyIcon icon="codicon:book" width={100} style={{ color: '#32814d' }} />
        </InvitationButton>

        <TableIconWrapper>
          <IconifyIcon icon="material-symbols:table-bar" width={400} style={{ color: '#84673e' }}></IconifyIcon>
        </TableIconWrapper>
      </Table>
    </Root>
  );
};
