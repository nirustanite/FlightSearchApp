import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import TrackedListStore from '../../redux/TrackedList';


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

    const [buttonTracked, setButtonTracked] = useState(false);

    const trackList = useSelector(state => state.trackedList.trackList);

    useEffect(() => {
        if(trackList.some(el => el.id === flight.id)){
            setButtonTracked(true);
        }else{
            setButtonTracked(false);
        }
    }, [flight, trackList]);

    const dispatch = useDispatch();

    const handleTrack = (flight) => {
        setButtonTracked(!buttonTracked);
        dispatch(TrackedListStore.actions.addTrackList(flight));  
    };

    const handleUntrack = (flight) => {
        dispatch(TrackedListStore.actions.removeFromTrackList(flight.id)); 
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
                {flight.scheduleDate ? flight.scheduleDate : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.scheduleTime ? flight.scheduleTime : '-' }
            </Table.Cell>
            <Table.Cell>
                {buttonTracked ? (
                    <StyledButton 
                        onClick={(e) => {
                            e.preventDefault();
                            handleUntrack(flight);
                        }}
                    >
                        UnTrack
                    </StyledButton>
                ) :(
                     <StyledButton 
                        onClick={(e) => {
                            e.preventDefault();
                            handleTrack(flight);
                        }}
                    >
                        Track
                  </StyledButton>
                )} 
            </Table.Cell>
        </React.Fragment>
    );
};

export default FlightListItem;