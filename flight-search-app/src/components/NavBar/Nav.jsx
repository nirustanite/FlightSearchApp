import React from 'react';
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

const Nav = () => {

    const matchHome = useRouteMatch({
        path: "/",
        exact: true
    });

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
            </Container>
        </StyledMenu>
    );
};

export default Nav;