
import {
  REQUEST_COLUMNS, REQUEST_COLUMNS_SUCCESS, REQUEST_DATA, REQUEST_DATA_SUCCESS
} from "./constants";

export const getColumns= () => {
  return {
    type: REQUEST_COLUMNS,
  };
}

export const getData= (payload) => {
  return {
    type: REQUEST_DATA,
    payload
  };
}

export const getColumnsSuccess= () => {
  return {
    type: REQUEST_COLUMNS_SUCCESS,
  };
}

export const getDataSuccess= (payload) => {
  return {
    type: REQUEST_DATA_SUCCESS,
    payload
  };
}


