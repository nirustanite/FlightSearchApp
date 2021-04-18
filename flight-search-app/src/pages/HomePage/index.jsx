import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const HomePage = () => {

    return (
        <Page> 
            <Container>
                <StyledHeader as="h1">Search your Flights</StyledHeader>
            </Container>
        </Page>
    );
};

export default HomePage;