import { takeEvery, put, call } from "redux-saga/effects";
import request from 'superagent';

//action types
const types = {
    GET_FLIGHT_LIST_REQUESTED : 'GET_FLIGHT_LIST_REQUESTED',
    GET_FLIGHT_LIST_SUCCEEDED : ' GET_FLIGHT_LIST_SUCCEEDED',
    GET_FLIGHT_LIST_FAILED : 'GET_FLIGHT_LIST_FAILED',
    SET_QUERY_LIST: "SET_QUERY_LIST",
    GET_FLIGHT_DETAILS_REQUESTED: 'GET_FLIGHT_DETAILS_REQUESTED',
    GET_FLIGHT_DETAILS_SUCCEEDED: 'GET_FLIGHT_DETAILS_SUCCEEDED',
    GET_FLIGHT_DETAILS_FAILED: 'GET_FLIGHT_DETAILS_FAILED',
    SET_ITEMS_PER_PAGE: 'SET_ITEMS_PER_PAGE'
};


export const actions = {
    getFlightList : (page, data) => ({
        type: types.GET_FLIGHT_LIST_REQUESTED,
        page,
        data
    }),
    setQueryList : (qObj) => ({
        type: types.SET_QUERY_LIST,
        qObj
    }),
    getFlightDetails: (flightId) => ({
        type: types.GET_FLIGHT_DETAILS_REQUESTED,
        flightId
    }),
    setItemsPerPage: (itemNumber) => ({
        type: types.SET_ITEMS_PER_PAGE,
        itemNumber
    })
};

export const initialState = {
    flights: [],
    loading: false,
    error: "",
    queryObj: {},
    flight: {},
    itemNumber: 5
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
        case types.SET_QUERY_LIST:
            return{
                ...state,
                queryObj: {...action.qObj},
                error: ""
            };
        case types.GET_FLIGHT_DETAILS_REQUESTED:
            return{
                ...state,
                loading: true
            }
        case types.GET_FLIGHT_DETAILS_SUCCEEDED:
            return{
                ...state,
                flight: action.payload,
                loading: false
            }
        case types.GET_FLIGHT_DETAILS_FAILED:
            return{
                ...state,
                error: action.payload,
                loading: false
            }
        case types.SET_ITEMS_PER_PAGE:
            return{
                ...state,
                itemNumber: action.itemNumber
            }
        default:
            return state;
    }
};


export function* saga(){
    yield takeEvery(types.GET_FLIGHT_LIST_REQUESTED, fetchFlightListWorker);
    yield takeEvery(types.GET_FLIGHT_DETAILS_REQUESTED, fetchFlightDetailsWorker);
};
 
export function* fetchFlightListWorker( { page, data }){
    try{
        const response = yield call(getFlightLists, { page, data });

        yield put({
            type: types.GET_FLIGHT_LIST_SUCCEEDED,
            payload: response.body.flights
        }); 
    }
    catch(error){
        yield put({
            type: types.GET_FLIGHT_LIST_FAILED,
            payload: "Error Occurred"
        }); 
    } 
};
 
export function* fetchFlightDetailsWorker({ flightId }){
    try{
        const response = yield call(callFlightDetails, { flightId });

        yield put({
            type: types.GET_FLIGHT_DETAILS_SUCCEEDED,
            payload: response.body
        }); 
    }
    catch(error){
        yield put({
            type: types.GET_FLIGHT_DETAILS_FAILED,
            payload: "Error Occurred"
        }); 
    } 
}

function getFlightLists({ page, data }) {
    return request
    .get(`/api/public-flights/flights?page=${page}`)
    .query(data)
    .set('Accept', `application/json`)
    .set('ResourceVersion', `v4`)
}

function callFlightDetails({ flightId }){
    return request
    .get(`/api/public-flights/flights/${flightId}`)
    .set('Accept', `application/json`)
    .set('ResourceVersion', `v4`)
}