import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Sidebar, Icon, Menu } from "semantic-ui-react";
import { useRouteMatch } from "react-router-dom";
import routes from '../../pages/routes';
import styled from 'styled-components';

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
const HamburgerMenu = (props) => {

    const [visible, setVisible] = useState(false);

    const matchHome = useRouteMatch({
        path: "/",
        exact: true
    });

    const matchTrackedFlights = useRouteMatch({
        path:'/tracked-flights'
    });
  
    const handlePusher = () => {
        if (visible) setVisible(false);
    };
  
    const handleToggle = () => setVisible(!visible);

    const trackList = useSelector(state => state.trackedList.trackList)

    return (
        <React.Fragment>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation="overlay"
                        icon="labeled"
                        visible={visible}
                        vertical
                        width='thin'
                    >
                       <Menu.Item
                         name="HOME"
                         // icon="building outline"
                         active={!!matchHome}
                         as={Link}
                         to={routes.HOME}
                       >
                         Home
                       </Menu.Item>
                       <Menu.Item
                         name="TRACKEDLIST"
                         // icon="building outline"
                         active={!!matchTrackedFlights}
                         as={Link}
                         to={routes.TRACKED_FLIGHTS}
                       >
                         TrackedFlights &nbsp;
                         <StyledDiv>{trackList.length}</StyledDiv>
                       </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher
                        dimmed={visible}
                        onClick={handlePusher}
                        style={{ minHeight: "100vh" }}
                    >
                        <Menu fixed="top" borderless>
                            <Menu.Item onClick={handleToggle}>
                                <Icon name="sidebar" />
                            </Menu.Item>
                            <Menu.Item as="span">
                                <Icon name='plane' color='blue' />
                               Flight Search
                            </Menu.Item>
                        </Menu>
                       {props.child}
                    </Sidebar.Pusher>
                </Sidebar.Pushable> 
        </React.Fragment>
    );
};

export default HamburgerMenu;