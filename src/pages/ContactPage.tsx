import React from 'react';
import styled from 'styled-components';
import { Link } from '../components/Link';
import { Menu } from '../components/Menu';
import { Spacings } from '../styles/spacings';
import { Theme } from '../styles/theme';
import EmailImageUrl from './../assets/images/email.png';
import InstagramImageUrl from './../assets/images/instagram.png';

const Header = styled.div`
  width: '100%';
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${Spacings.lg};
  padding: ${Spacings.xs} ${Spacings.lg};
  border-bottom: 1px solid lightgray;

  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 5px 0 rgba(0, 0, 0, 0.19);
`;

const StyledH2 = styled.h2`
  font-weight: 700;
  color: ${Theme.secondary};
`;

const StyledH3 = styled.h3`
  font-weight: 600;
  color: ${Theme.secondary};
`;

const Content = styled.div`
  padding: 0 ${Spacings.lg};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Spacings.md};
`;

const Image = styled.img`
  align-self: center;
  margin-top: ${Spacings.lg};
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  padding: 0 ${Spacings.md};
`;

const Column = styled.div`
  display: flex;
  min-width: 222px;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  font-family: 'Roboto';
  font-weight: 300;
`;

const LinkAnchorProps = {
  color: Theme.secondary
};

export const ContactPage = () => {
  return (
    <div>
      <Header>
        <StyledH2>Kontakt</StyledH2>

        <Menu iconColor={Theme.secondary}>
          <Link href="/vendors" anchorProps={LinkAnchorProps}>
            Warsztaty
          </Link>

          <Link href="/vendors" anchorProps={LinkAnchorProps}>
            Wystawcy
          </Link>

          <Link href="/organizers" anchorProps={LinkAnchorProps}>
            Organizatorzy
          </Link>
        </Menu>
      </Header>

      <Content>
        <Card>
          <StyledH3>Dziergamy na polu</StyledH3>

          <Row>
            <Column>
              <Image width={80} src={EmailImageUrl} alt="logo" />
              <Text>dziergamynapolu@gmail.com</Text>
              {/* <a href="https://www.flaticon.com/free-icons/email" title="email icons">
            Email icons created by Smashicons - Flaticon
          </a> */}
            </Column>

            <Column>
              <Image width={80} src={InstagramImageUrl} alt="logo" />
              <Text>@dziergamynapolu</Text>

              {/* <a href="https://www.flaticon.com/free-icons/instagram" title="instagram icons">Instagram icons created by Freepik - Flaticon</a> */}
            </Column>
          </Row>
        </Card>
      </Content>
    </div>
  );
};
