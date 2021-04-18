import { combineReducers } from "redux";
import flights from './Flights';

export default combineReducers({
    flights: flights.reducer,
});