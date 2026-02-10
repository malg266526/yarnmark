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
    grid-template-columns: repeat(${({ columns }) => columns}, 160px);
    width: auto;
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
    gap: ${RedesignSpacings.xxs};
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

  @media (max-width: ${ScreenSize.tablet}) {
    align-items: flex-start;
    overflow-x: auto;
    padding-bottom: ${RedesignSpacings.sm};
  }
`;

const WorkshopTitle = styled(Typography)`
  @media (max-width: ${ScreenSize.phone}) {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const sortByTime = (workshopsA: WorkshopsEntry, workshopsB: WorkshopsEntry) => {
  const getMinutes = (timeStr: string) => {
    const startTime = timeStr.split('-')[0].trim(); // Wyciąga "9:00" z "9:00 - 12:00"
    const [hours, minutes] = startTime.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return getMinutes(workshopsA.time) - getMinutes(workshopsB.time);
};

export const Schedule = () => {
  const isPhone = usePhone();
  const t = useTypedTranslation();
  const fontSize = isPhone ? 'sm' : 'md';
  const titleFontSize = isPhone ? 'sm' : 'md';
  const leadingFontSize = isPhone ? 'xs' : 'sm';

  const saturdayWorkshops = WorkshopsConfig.filter(
    (currentWorkshop) => !currentWorkshop.weekDay || currentWorkshop.weekDay === 'saturday'
  ).sort(sortByTime);

  const sundayWorkshops = WorkshopsConfig.filter((currentWorkshop) => currentWorkshop.weekDay === 'sunday').sort(
    sortByTime
  );

  const rooms = ['library', 'bursa1', 'conference', 'bursa2', 'reading_room', 'forum', 'skein'] as const;

  const renderCell = (workshop?: WorkshopsEntry, color?: keyof typeof HallColors) => {
    if (!workshop) return <EmptyCell key={Math.random()} />;

    return (
      <Cell key={workshop.topicKey + workshop.time} background={color}>
        <Typography size={leadingFontSize}>{workshop.leading}</Typography>
        <WorkshopTitle size={titleFontSize} weight="bold">
          {t(workshop.topicKey)}
        </WorkshopTitle>
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
      <Typography size="lg" weight="bold" style={{ alignSelf: 'center', position: 'sticky', left: 0 }}>
        {t('workshops.weekdays.saturday')}
      </Typography>
      {renderTable(saturdayWorkshops)}

      <Typography
        size="lg"
        weight="bold"
        style={{ marginTop: RedesignSpacings.sm, alignSelf: 'center', position: 'sticky', left: 0 }}
      >
        {t('workshops.weekdays.sunday')}
      </Typography>
      {renderTable(sundayWorkshops)}
    </TableContainer>
  );
};
