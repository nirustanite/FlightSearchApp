import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Popup , Icon } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import FlightsStore from '../../redux/Flights';
import useViewport from '../../util/useViewport';


const StyledDiv = styled.div`
    display: flex;
    flexDirection: row;
`;


const StyledButton = styled(Button)`
    &.ui.button{
        color: white !important;
        background: 2px #0085bb !important;
    }
`;

const StyledP = styled.p`
    color: red;
`;


const Search = () => {

    const { width } = useViewport();

    const breakpoint = 750;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        let qObj = {};
            if(data.scheduleDate){
                qObj = {...qObj, 'scheduleDate': data.scheduleDate};
                qObj = {...qObj, 'flightDirection': 'D' };
            }
            if(data.airline){
                qObj = {...qObj, 'airline': data.airline };
        }
        dispatch(FlightsStore.actions.setQueryList(qObj));
        dispatch(FlightsStore.actions.getFlightList(0, qObj));
    };

    const handleClick = (e) => {
        let qObj = {}
        e.preventDefault();
        reset();
        dispatch(FlightsStore.actions.setQueryList(qObj));
        dispatch(FlightsStore.actions.getFlightList(0));
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field width={width > breakpoint ? 4 : 16}>
                <label htmlFor="scheduledDate"> Scheduled Date </label>
                <input 
                    type="date"
                    id="scheduleDate"
                    name="scheduleDate"
                    {...register("scheduleDate")}
                />
            </Form.Field>
    
            <Form.Field width={width > breakpoint ? 4 : 16}>
                <label htmlFor="airline"> Airline </label>
                <StyledDiv>
                    <input 
                        type="search" 
                        name="airline"
                        maxLength="3"
                        placeholder="Search through airline code"
                        {...register("airline", {
                            maxLength: 3,
                            pattern:/^[A-Z]+$/
                        })}
                        style={{ marginTop: '2px' }}
                    />
                    <Popup
                        trigger={<Icon 
                                    size='small' 
                                    name='info' 
                                    circular 
                                    style={{ marginLeft: '10px', marginTop : '10px' }}
                                />}
                        content="This field can contain the first two or three alphabets in the flightName.(e,g. if flightname is MNB150, airline is MNB)."
                        basic
                        position='right center'
                    />
                </StyledDiv>
            </Form.Field>
            
            {errors?.airline?.type === "maxLength" && (
                <StyledP>Airline should not exceed 3 characters</StyledP>
            )}
            {errors?.airline?.type === "pattern" && (
                <StyledP>Airline value should be uppercase</StyledP>
            )}
        <StyledButton type='submit' onClick={handleClick}>Reset</StyledButton>
        <StyledButton type='submit'>Search</StyledButton>
      </Form>
    );
};

export default Search;