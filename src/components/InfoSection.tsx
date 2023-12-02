import styled from 'styled-components';

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const Root = styled.div``;

export const InfoSection = Object.assign(Root, {
  Title,
  Text
});
