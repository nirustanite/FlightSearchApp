import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import FlightsStore from '../../redux/Flights';

const StyledButton = styled(Button)`
    &.ui.button{
        color: white !important;
        background: 2px #0085bb !important;
    }
    &.ui.button.hover {
        background-color: #0085bb !important;
        color: white !important
    }
`;



const FlightListItem = ({ flight }) => {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(FlightsStore.actions.addTrackCount());  
    };


    return(
        <React.Fragment>
            <Table.Cell>
                {flight.flightName ? flight.flightName : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.flightNumber ? flight.flightNumber : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.airlineCode ? flight.airlineCode : '-' } 
            </Table.Cell>
            <Table.Cell>
                {flight.flightDirection ? flight.flightDirection : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.scheduledDate ? flight.scheduledDate : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.scheduledTime ? flight.scheduledTime : '-' }
            </Table.Cell>
            <Table.Cell>
                <StyledButton 
                   onClick={handleClick}
                >
                  Track
                </StyledButton>
            </Table.Cell>
        </React.Fragment>
    );
};

export default FlightListItem;