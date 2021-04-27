import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Loader, Dropdown, Button, Header } from 'semantic-ui-react';
import FlightListItem from './FlightListItem';
import styled from 'styled-components';
import FlightsStore from '../../redux/Flights';


const StyledDiv = styled.div`
    margin-top: 50px;
`;

const Flights = props => {
   
    const [pageNum, setPageNum] = useState(props.pageNum);
    const dispatch = useDispatch();

    const flightsList = useSelector(state => state.flights.flights);
    const error = useSelector(state => state.flights.error);
    const loading = useSelector(state => state.flights.loading);
    const queryObj = useSelector(state => state.flights.queryObj);
    
    const currentItems = flightsList.slice(0, props.itemNumber);

    const handleChange = (e, data) => {
        dispatch(FlightsStore.actions.setItemsPerPage(data.value));
    }

    const handlePrev = (e) => {
        e.preventDefault();
        if(pageNum !== 0){
            setPageNum(pageNum - 1);
            if(queryObj.airline || queryObj.scheduleDate){
                dispatch(FlightsStore.actions.getFlightList(pageNum - 1, queryObj));
            }else{
                dispatch(FlightsStore.actions.getFlightList(pageNum - 1));
            }
            
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        if(flightsList.length !== 0){
            setPageNum(pageNum + 1);
            if(queryObj.airline || queryObj.scheduleDate){
                dispatch(FlightsStore.actions.getFlightList(pageNum + 1, queryObj));
            }else{
                dispatch(FlightsStore.actions.getFlightList(pageNum + 1));
            }
        }
    }

    return(
        <React.Fragment>
            {loading ? (
                <>
                  <Loader active inline='centered' />
                </>
            ) : (
                <StyledDiv>
                    {error ? (
                        <Header as='h4'> Sorry no flights found. Search again with different values </Header>
                    ) : ( 
                    <>
                    {flightsList.length >= 1 && <Table striped color='blue'>
                        <Table.Header >
                            <Table.Row style={{ textAlign: 'center' }}>
                                <Table.HeaderCell>Flight Name</Table.HeaderCell>
                                <Table.HeaderCell>Flight Number</Table.HeaderCell>
                                <Table.HeaderCell>AirlineCode</Table.HeaderCell>
                                <Table.HeaderCell>Flight Direction</Table.HeaderCell>
                                <Table.HeaderCell>Scheduled Date</Table.HeaderCell>
                                <Table.HeaderCell>Scheduled Time</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {currentItems.map(flight => {
                                return <Table.Row key={flight.id} style={{ textAlign: 'center' }}>
                                    <FlightListItem flight={flight}/>
                                </Table.Row>
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='7'>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                                            <p> Page: {pageNum + 1} </p>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px', flexWrap: 'wrap' }}>
                                                <p>Items per page : </p>
                                                <Dropdown
                                                    inline
                                                    options={props.options}
                                                    defaultValue={props.options[props.defaultValueIndex].value}
                                                    style={{ marginLeft: '10px' }}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Button 
                                                inverted
                                                color = 'blue'
                                                onClick={handlePrev}
                                                disabled={pageNum === 0}
                                            > Prev </Button>
                                            <Button
                                                inverted
                                                color = 'blue'
                                                onClick={handleNext}
                                                disabled={flightsList.length === 0}
                                            > Next </Button>
                                        </div>
                                    </div>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>}
                    </>
                    )}
                </StyledDiv>
            )}
        </React.Fragment>
    );
};

export default Flights