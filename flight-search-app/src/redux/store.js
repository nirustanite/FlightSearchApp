
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';
import { loadState } from '../util/localstorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
)

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(()=>{
    localStorage.setItem('state', JSON.stringify(store.getState()))
})

sagaMiddleware.run(rootSaga);

export default store;