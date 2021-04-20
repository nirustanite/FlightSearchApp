import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import FlightsStore from '../../redux/Flights';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';
import DisplayDetails from '../../components/DisplayDetails/DisplayDetails';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const DetailsPage = () => {

    const { id } = useParams();
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(FlightsStore.actions.getFlightDetails(id));
    },[id, dispatch]);

    return(
        <Page>
            <Container>
                <StyledHeader as="h1">Flight Details</StyledHeader>
                <DisplayDetails />
            </Container>
        </Page>
    );
};

export default DetailsPage;