import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Popup , Icon } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import FlightsStore from '../../redux/Flights';

const StyledDiv = styled.div`
    display: flex;
    flexDirection: row;
`;

const Search = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

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
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field width={4}>
                <label htmlFor="scheduledDate"> Scheduled Date </label>
                <input 
                    type="date"
                    id="scheduleDate"
                    name="scheduleDate"
                    {...register("scheduleDate")}
                />
            </Form.Field>
    
            <Form.Field width={4}>
                <label htmlFor="airline"> Airline </label>
                <StyledDiv>
                    <input 
                        type="search" 
                        name="airline"
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
                <p>Airline should not exceed 3 characters</p>
            )}
            {errors?.airline?.type === "pattern" && (
                <p>Airline value should be uppercase</p>
            )}
        <Button type='submit'>Search</Button>
      </Form>
    );
};

export default Search;