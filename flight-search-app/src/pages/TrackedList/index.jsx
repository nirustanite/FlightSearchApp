import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const TrackedList = () => {
    return <Page>
        <Container>
            <StyledHeader as="h1">Tracked Flights</StyledHeader>
        </Container>
    </Page>
};

export default TrackedList;