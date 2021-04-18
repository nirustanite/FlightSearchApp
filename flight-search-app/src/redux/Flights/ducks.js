import { takeEvery, put, call } from "redux-saga/effects";
import request from 'superagent';
//import { app_id, app_key } from '../../config';

//action types
const types = {
    GET_FLIGHT_LIST_REQUESTED : 'GET_FLIGHT_LIST_REQUESTED',
    GET_FLIGHT_LIST_SUCCEEDED : ' GET_FLIGHT_LIST_SUCCEEDED',
    GET_FLIGHT_LIST_FAILED : 'GET_FLIGHT_LIST_FAILED',
    ADD_TRACK_COUNT: 'ADD_TRACK_COUNT'
};

// actions for questions
export const actions = {
    getFlightList : (page) => ({
        type: types.GET_FLIGHT_LIST_REQUESTED,
        page
    }),
    addTrackCount: () => ({
        type: types.ADD_TRACK_COUNT
    })
};

export const initialState = {
    flights: [],
    loading: false,
    error: "",
    trackCount: 0,
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.GET_FLIGHT_LIST_REQUESTED:
            return{
                ...state,
                loading: true
            };
        case types.GET_FLIGHT_LIST_SUCCEEDED:
            return{
                ...state,
                flights: action.payload,
                loading: false
            };
        case types.GET_FLIGHT_LIST_FAILED:
            return{
                ...state,
                error: action.payload,
                loading: false
            };
        case types.ADD_TRACK_COUNT: {
            return {
                ...state,
                trackCount: state.trackCount + 1
            }
        }
        default:
            return state;
    }
};


export function* saga(){
    yield takeEvery(types.GET_FLIGHT_LIST_REQUESTED, fetchFlightListWorker);
};
 
export function* fetchFlightListWorker( { page }){
    try{
        const response = yield call(getFlightLists, { page });
       
        let list = [];
        if(response.body.flights.length >= 1) {
            list = response.body.flights.map((flight) => {
                return {
                    id: flight.id,
                    flightName: flight.flightName,
                    flightNumber:  flight.flightNumber,
                    mainFlight: flight.mainFlight,
                    airlineCode: flight.airlineCode,
                    flightDirection: flight.flightDirection,
                    scheduledDate:flight.scheduleDate,
                    scheduledTime: flight.scheduleTime,
                    estimatedLandingTime: flight.estimatedLandingTime,
                    expectedTimeOnBelt: flight.expectedTimeOnBelt,
                    gate: flight.gate,
                    terminal: flight.terminal,
                    route: flight.route,
                    baggageClaim: flight.baggageClaim
                }
            })
        }

        yield put({
            type: types.GET_FLIGHT_LIST_SUCCEEDED,
            payload: list
        }); 
    }
    catch(error){
        yield put({
            type: types.GET_FLIGHT_LIST_FAILED,
            payload: "Error Occurred"
        }); 
    } 
};

function getFlightLists({ page }) {
    return request
    .get(`/api/public-flights/flights?page=${page}`)
    .set('Accept', `application/json`)
    .set('ResourceVersion', `v4`)
}