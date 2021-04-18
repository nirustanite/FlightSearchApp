import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { useRouteMatch, Link } from "react-router-dom";
import routes from '../../pages/routes';
import styled from 'styled-components';

const StyledMenu = styled(Menu)`
    border: none !important;
    .item {
        
        &:first-child {
            border-left: 0px !important;
        }
        &::before {
            display: none;
        }    
        &.active {
            box-shadow: 0px -2px 0px 0px #0085bb inset !important;
            background: none !important;
        }
    }   
`;

const StyledDiv = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 5px;

    background: #0085bb;
    border: 2px solid #0085bb;
    color: white;
    text-align: center;
`;

const Nav = () => {

    const matchHome = useRouteMatch({
        path: "/",
        exact: true
    });

    const matchTrackedFlights = useRouteMatch({
        path:'/tracked-flights'
    });

    const trackCount = useSelector(state => state.flights.trackCount)

    return(
        <StyledMenu fixed="top" stackable>
            <Container>
                <Menu.Item>
                    <Icon name='plane' color='blue' />
                    Flight Search
                </Menu.Item>
                <Menu.Item 
                    as={Link}
                    name="HOME"
                    to={routes.HOME}
                    active={!!matchHome}
                >
                    Home
                </Menu.Item>
                <Menu.Menu position="right"> 
                    <Menu.Item 
                        float="right"
                        as={Link}
                        name="Trackedlist"
                        to={routes.TRACKED_FLIGHTS}
                        active={!!matchTrackedFlights}
                    >
                         TrackedFlights &nbsp;
                        <StyledDiv>{trackCount}</StyledDiv>
                    </Menu.Item>
                </Menu.Menu>
                
            </Container>
        </StyledMenu>
    );
};

export default Nav;