import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork, all } from 'redux-saga/effects';

import { dataSourceReducer } from './DataSource/state/reducer';
import dataSourceSaga from './DataSource/state/sagas';


export const rootReducer = combineReducers({
    dataSourceReducer,
    router: routerReducer
})

export function* rootSaga() {
    yield all([dataSourceSaga()]);
}

