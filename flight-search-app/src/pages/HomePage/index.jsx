import React from 'react';
import { useDispatch } from 'react-redux'
import { Header, Container, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';
import FlightsStore from '../../redux/Flights';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const HomePage = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(FlightsStore.actions.getFlightList());
    }

    return (
        <Page> 
            <Container>
                <StyledHeader as="h1">Search your Flights</StyledHeader>
                <Button onClick={handleClick}>Hey</Button>
            </Container>
        </Page>
    );
};

export default HomePage;