import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';
import FlightsStore from '../../redux/Flights';
import Flights from '../../components/DisplayFlights/Flights';
import Search from '../../components/Search/Search';
import options from '../../util/options';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const HomePage = () => {

    const dispatch = useDispatch();

    const queryObj = useSelector(state => state.flights.queryObj);
    const itemNumber = useSelector(state => state.flights.itemNumber);

    useEffect(() => {
        dispatch(FlightsStore.actions.getFlightList(0, queryObj));
    },[dispatch, queryObj]);
   
    return (
        <Page> 
            <Container>
                <StyledHeader as="h1">Search your Flights</StyledHeader>
                <Search/>
                <Flights 
                    pageNum={0} 
                    itemNumber={itemNumber} 
                    options={options} 
                    defaultValueIndex={itemNumber && options.findIndex(el=> parseInt(el.key) === parseInt(itemNumber))} 
                />
            </Container>
        </Page>
    );
};

export default HomePage;