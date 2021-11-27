import { takeEvery, all, put } from "redux-saga/effects";
import axios from "axios";
import {
  REQUEST_COLUMNS,
  REQUEST_COLUMNS_SUCCESS,
  REQUEST_DATA,
  REQUEST_DATA_SUCCESS,
} from "./constants";

let baseUrl = "https://plotter-task.herokuapp.com/columns";
// const proxyurl = "https://cors-anywhere.herokuapp.com/";

export function* getColumns() {
  let columns = [];
  yield axios
    .get(baseUrl)
    .then(function (response) {
      columns = response.data;
    })
    .catch(function (error) {
      return error;
    });
  yield put({
    type: REQUEST_COLUMNS_SUCCESS,
    payload: columns,
  });
}

export function* getData(action) {
  baseUrl = "https://plotter-task.herokuapp.com/data";
  let data = [];
  const headers = { 
    'Content-Type': 'application/json'
};
  yield axios
    .post(baseUrl, { measures: action.payload.measures, dimension: action.payload.dimension }, {headers})
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {
      console.log(error)
      return error;
    });
  yield put({
    type: REQUEST_DATA_SUCCESS,
    payload: data,
  });
}

export default function* dataSourceSaga() {
  yield all([
    takeEvery(REQUEST_COLUMNS, getColumns),
    takeEvery(REQUEST_DATA, getData),
  ]);
}
