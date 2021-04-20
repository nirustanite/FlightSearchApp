import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const FlightListItem = ({ flight }) => {

    return(
        <React.Fragment>
            <Table.Cell>
                <Link to={`/flight-details/${flight.id}`}>
                    {flight.flightName ? flight.flightName : '-' }
                </Link>
            </Table.Cell>
            <Table.Cell>
                {flight.flightNumber ? flight.flightNumber : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.flightDirection ? flight.flightDirection : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.terminal ? flight.terminal : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.scheduleDate ? flight.scheduleDate : '-' }
            </Table.Cell>
            <Table.Cell>
                {flight.scheduleTime ? flight.scheduleTime : '-' }
            </Table.Cell>
        </React.Fragment>
    );
};

export default FlightListItem;