import { fork, all } from "redux-saga/effects";
import map from "lodash/map";
import flights from './Flights';

const combinedSagas = [
  flights.saga,
];

export default function* root() {
    yield all(map(combinedSagas, fork));
}