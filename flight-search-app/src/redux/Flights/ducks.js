import { takeEvery, put, call } from "redux-saga/effects";
import request from 'superagent';

//action types
const types = {
    GET_FLIGHT_LIST_REQUESTED : 'GET_FLIGHT_LIST_REQUESTED',
    GET_FLIGHT_LIST_SUCCEEDED : ' GET_FLIGHT_LIST_SUCCEEDED',
    GET_FLIGHT_LIST_FAILED : 'GET_FLIGHT_LIST_FAILED',
    SET_QUERY_LIST: "SET_QUERY_LIST"
};


export const actions = {
    getFlightList : (page, data) => ({
        type: types.GET_FLIGHT_LIST_REQUESTED,
        page,
        data
    }),
    setQueryList : (qObj) => {
        return{
            type: types.SET_QUERY_LIST,
            qObj
        }
       
    }
};

export const initialState = {
    flights: [],
    loading: false,
    error: "",
    queryObj: {}
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
                queryObj: {...action.qObj}
            };
        default:
            return state;
    }
};


export function* saga(){
    yield takeEvery(types.GET_FLIGHT_LIST_REQUESTED, fetchFlightListWorker);
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

function getFlightLists({ page, data }) {
    return request
    .get(`/api/public-flights/flights?page=${page}`)
    .query(data)
    .set('Accept', `application/json`)
    .set('ResourceVersion', `v4`)
}