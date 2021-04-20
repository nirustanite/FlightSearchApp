
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
)

// const persistedState = localStorage.getItem('state') 
//                        ? JSON.parse(localStorage.getItem('state'))
//                        : {}

const store = createStore(rootReducer, enhancer);

// store.subscribe(()=>{
//     localStorage.setItem('state', JSON.stringify(store.getState()))
// })

sagaMiddleware.run(rootSaga);

export default store;