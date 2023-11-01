import styled from 'styled-components';

export const Card = styled.div<{
  flexDirection?: 'row' | 'column';
  width?: `${number}%` | `${number}px`;
  height?: `${number}%` | `${number}px`;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  display: flex;
  flex-direction: ${({ flexDirection: direction }) => direction || 'column'};

  background-color: white;

  border-radius: 15px;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;
