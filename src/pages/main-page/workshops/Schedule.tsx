import React from 'react';
import styled from 'styled-components';
import { RedesignSpacings } from '../../../styles/spacings';
import { getHallColorKey, HallColors } from '../../../styles/theme';
import { Typography } from '../../../components/Typography';
import { ScreenSize } from '../../../styles/screeen-size';
import { usePhone } from '../../../hooks/usePhone';
import { WorkshopsConfig, WorkshopsEntry } from './workshopsConfig';
import { useTypedTranslation } from '../../../translations/useTypedTranslation';

const Table = styled.div<{ columns: number }>`
  display: grid;
  flex: 1;
  width: 100%;

  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: auto;
  grid-gap: ${RedesignSpacings.sm};

  @media (max-width: ${ScreenSize.tablet}) {
    max-width: 100vw;
    width: 100%;
    overflow: scroll;
    min-width: ${({ columns }) => columns * 160}px;

    grid-gap: ${RedesignSpacings.xxs};
  }
`;

const Th = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Cell = styled.div<{ background?: keyof typeof HallColors }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${RedesignSpacings.sm};
  border-radius: ${RedesignSpacings.xxs};
  min-height: 150px;
  gap: ${RedesignSpacings.xs};

  background-color: ${({ background }) => (background ? HallColors[background] : 'transparent')};

  @media (max-width: ${ScreenSize.phone}) {
    padding: ${RedesignSpacings.xs};
    min-height: 120px;
  }
`;

const EmptyCell = styled(Cell)`
  background-color: transparent;
  box-shadow: none;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${RedesignSpacings.md};
  width: 100%;
`;

export const Schedule = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();
  const fontSize = isPhone ? 'sm' : 'md';

  const saturdayWorkshops = WorkshopsConfig.filter((w) => !w.weekDay || w.weekDay === 'saturday').sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const sundayWorkshops = WorkshopsConfig.filter((w) => w.weekDay === 'sunday').sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const rooms = ['library', 'bursa1', 'conference', 'bursa2', 'reading_room', 'forum', 'skein'] as const;

  const renderCell = (workshop?: WorkshopsEntry, color?: keyof typeof HallColors) => {
    if (!workshop) return <EmptyCell key={Math.random()} />;

    return (
      <Cell key={workshop.topicKey + workshop.time} background={color}>
        <p>{workshop.leading}</p>
        <h4>{t(workshop.topicKey)}</h4>
        <Typography size={fontSize}>{workshop.time}</Typography>
      </Cell>
    );
  };

  const renderTable = (workshops: WorkshopsEntry[]) => {
    const workshopsByRoom: Record<string, WorkshopsEntry[]> = {};
    rooms.forEach((room) => {
      workshopsByRoom[room] = workshops.filter((w) => w.room === room);
    });

    const activeRooms = rooms.filter((room) => workshopsByRoom[room].length > 0);

    if (activeRooms.length === 0) {
      return null;
    }

    const maxRows = Math.max(...activeRooms.map((room) => workshopsByRoom[room].length));

    return (
      <Table columns={activeRooms.length}>
        {activeRooms.map((room) => (
          <Th key={room}>
            <Typography size={fontSize} weight="bold">
              {t(`workshops.room.${room}`)}
            </Typography>
          </Th>
        ))}

        {Array.from({ length: maxRows }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {activeRooms.map((room, colIndex) => {
              const workshop = workshopsByRoom[room][rowIndex];
              const colorKey = getHallColorKey(colIndex);
              return renderCell(workshop, colorKey);
            })}
          </React.Fragment>
        ))}
      </Table>
    );
  };

  return (
    <TableContainer>
      <Typography size="lg" weight="bold">
        {t('workshops.weekdays.saturday')}
      </Typography>
      {renderTable(saturdayWorkshops)}

      <Typography size="lg" weight="bold" style={{ marginTop: RedesignSpacings.lg }}>
        {t('workshops.weekdays.sunday')}
      </Typography>
      {renderTable(sundayWorkshops)}
    </TableContainer>
  );
};
