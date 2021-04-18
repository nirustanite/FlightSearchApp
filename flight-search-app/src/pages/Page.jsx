import React from "react";
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import Nav from '../components/NavBar/Nav';
import useViewport from '../util/useViewport';
import HamburgerMenu from '../components/NavBar/HamburgerMenu';

const StyledContainer = styled(Container)`
    padding-top: 5em;
    padding-bottom: 5em;
`;


const Page = ({ children }) => {

    const { width } = useViewport();

    const breakpoint = 750;

    return (
        <React.Fragment>
            {width < breakpoint ? (
                 <HamburgerMenu child={<StyledContainer>{children}</StyledContainer>}/>
            ) : (
                <React.Fragment>
                    <Nav />
                    <StyledContainer>{children}</StyledContainer>
                </React.Fragment>
            )}
           
        </React.Fragment>
    );
};

export default Page;