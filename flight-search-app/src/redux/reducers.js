import { combineReducers } from "redux";
import flights from './Flights';
import trackedList from './TrackedList';

export default combineReducers({
    flights: flights.reducer,
    trackedList: trackedList.reducer
});