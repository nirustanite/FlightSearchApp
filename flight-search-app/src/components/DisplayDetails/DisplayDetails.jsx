import React from 'react';
import { useSelector } from 'react-redux';
import { Header , Segment} from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';

const StyledHeader = styled(Header)`
    color: #0085bb;
`;

const MainDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;

const SubDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledSegment = styled(Segment)`
    background-color: #F5F5F5 !important;
`;

const DisplayDetails = () => {

    const flight = useSelector(state => state.flights.flight)

    return(
        <React.Fragment>
            <Segment padded>
                <MainDiv>
                    <SubDiv>
                        <StyledHeader as="h4">Flight Name</StyledHeader>
                        <p>{flight.flightName ? flight.flightName : '-' }</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h5">Flight Number</StyledHeader>
                        <p>{flight.flightNumber ? flight.flightNumber : '-'}</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h5">Flight Direction</StyledHeader>
                        <p>{flight.flightDirection? flight.flightDirection: '-'}</p>
                    </SubDiv>
                </MainDiv>
                <MainDiv>
                    <SubDiv>
                        <StyledHeader as="h4">Scheduled Date</StyledHeader>
                        <p>{flight.scheduleDate ? flight.scheduleDate : '-'}</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h5">Scheduled Time</StyledHeader>
                        <p>{flight.scheduleTime ? flight.scheduleTime: '-'}</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h5">Estimated Landing Time</StyledHeader>
                        <p>{flight.estimatedLandingTime ? moment(flight.estimatedLandingTime).format('HH:MM:SS') : '-' }</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h5">Actual Landing Time</StyledHeader>
                        <p>{flight.actualLandingTime ? moment(flight.actualLandingTime).format('HH:MM:SS') : '-' }</p>
                    </SubDiv>
                </MainDiv>
                <StyledSegment>
                <MainDiv>
                    <SubDiv>
                        <StyledHeader as="h5">AirlineCode</StyledHeader>
                        <p>{flight.airlineCode ?  flight.airlineCode : '-' }</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h4">Gate</StyledHeader>
                        <p>{flight.gate ? flight.gate : '-'}</p>
                    </SubDiv>
                    <SubDiv style={{ marginLeft: '20px' }}>
                        <StyledHeader as="h5">Terminal</StyledHeader>
                        <p>{flight.terminal ? flight.terminal: '-'}</p>
                    </SubDiv>
                </MainDiv>
                </StyledSegment>
                {flight.route && flight.route.destinations.length >=1 && <StyledSegment>
                    <StyledHeader as="h4">Destinations</StyledHeader>
                    <MainDiv>
                        {flight.route && flight.route.destinations.map((destination,i) => {
                            return <p key={i} style={{ marginLeft: '10px' }}>{destination}</p>
                        })}
                    </MainDiv>
                </StyledSegment>}
                {flight.baggageClaim && flight.baggageClaim.belts.length >=1 && <StyledSegment>
                    <StyledHeader as="h4">Belts</StyledHeader>
                    <MainDiv>
                        {flight.route && flight.baggageClaim.belts.map((belt,i) => {
                            return <p key={i} style={{ marginLeft: '10px' }}>{belt}</p>
                        })}
                    </MainDiv>
                </StyledSegment>}
                {flight.codeshares && flight.codeshares.codeshares.length >=1 && <StyledSegment>
                    <StyledHeader as="h4">CodeShares</StyledHeader>
                    <MainDiv>
                        {flight.codeshares && flight.codeshares.codeshares.map((codeshare,i) => {
                            return <p key={i} style={{ marginLeft: '10px' }}>{codeshare}</p>
                        })}
                    </MainDiv>
                </StyledSegment>}
            </Segment>
        </React.Fragment>
    );
};

export default DisplayDetails;