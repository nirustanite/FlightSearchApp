import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';
import FlightsStore from '../../redux/Flights';
import Flights from '../../components/DisplayFlights/Flights';
import Search from '../../components/Search/Search';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FlightsStore.actions.getFlightList(0));
    },[dispatch]);

   
    return (
        <Page> 
            <Container>
                <StyledHeader as="h1">Search your Flights</StyledHeader>
                <Search/>
                <Flights pageNum={0} />
            </Container>
        </Page>
    );
};

export default HomePage;