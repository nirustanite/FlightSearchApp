import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import Page from '../Page';
import TrackedLists from '../../components/DisplayTrackedList/TrackedList';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #0085bb;
`;

const TrackedList = () => {

    const trackedList = useSelector(state => state.trackedList.trackList);

    return <Page>
        <Container>
            <StyledHeader as="h1">Tracked Flights</StyledHeader>
            <TrackedLists trackedList={trackedList} itemsPerPage={5}/>
        </Container>
    </Page>
};

export default TrackedList;