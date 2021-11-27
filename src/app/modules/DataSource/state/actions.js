
import {
  ALL_ITEMS_DELETED,
  COLUMN_DRAGGED,
  ITEM_DELETED,
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

export const columnDragged= (payload) => {
  return {
    type: COLUMN_DRAGGED,
    payload
  };
}

export const itemDeleted= (payload) => {
  return {
    type: ITEM_DELETED,
    payload
  };
}

export const allItemsDeleted= () => {
  return {
    type: ALL_ITEMS_DELETED
  };
}





