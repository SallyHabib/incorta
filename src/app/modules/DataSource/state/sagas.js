import { takeEvery, all, put } from "redux-saga/effects";
import axios from "axios";
import { REQUEST_COLUMNS, REQUEST_DATA } from "./constants";
import {
  getColumnsFailed,
  getColumnsSuccess,
  getDataFailed,
  getDataSuccess,
} from "./actions";

let baseUrl = "https://plotter-task.herokuapp.com/columns";

export function* getColumns() {
  let columns = [];
  let errorMessage = null;
  yield axios
    .get(baseUrl)
    .then((response) => {
      columns = response.data;
    })
    .catch((error) => {
      errorMessage = error.message;
    });
  if (errorMessage) {
    yield put(
      getColumnsFailed("There was a problem fetching Columns please try again")
    );
    return;
  }
  yield put(
    getColumnsSuccess(
      columns.map((column) => {
        if (column.name === "Cost" || column.name === "Product")
          return { ...column, dragged: true };
        else return { ...column, dragged: false };
      })
    )
  );
}

export function* getData(action) {
  baseUrl = "https://plotter-task.herokuapp.com/data";
  let errorMessage = null;
  let data = [];
  const headers = {
    "Content-Type": "application/json",
  };
  yield axios
    .post(
      baseUrl,
      {
        measures: action.payload.measures,
        dimension: action.payload.dimension,
      },
      { headers }
    )
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      errorMessage = error.message;
    });

  if (errorMessage) {
    yield put(
      getDataFailed("There was an error fetching data please try again")
    );
    return;
  }

  yield put(getDataSuccess(data));
}

export default function* dataSourceSaga() {
  yield all([
    takeEvery(REQUEST_COLUMNS, getColumns),
    takeEvery(REQUEST_DATA, getData),
  ]);
}
