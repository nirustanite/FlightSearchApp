
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
)

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;