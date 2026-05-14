import styled from 'styled-components';
import { Band } from '../../components/bands/Band';
import { PlainInfo } from '../for-vendors/ForVendorsPage.styled';

export const AdminPagePanel = styled(Band.NarrowColumn)`
  width: 100%;
`;

export const AdminPageBody = styled(PlainInfo)`
  width: 100%;
  align-items: stretch;
`;
