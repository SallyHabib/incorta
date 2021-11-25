import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork, all } from 'redux-saga/effects';

import { shipments } from './shipments/state/reducer';
import * as uiSagas from './shipments/state/sagas';


export const rootReducer = combineReducers({
    shipments,
    router: routerReducer
})

export function* rootSaga() {
    yield all([
        ...Object.values(uiSagas),
    ].map(fork))
}

