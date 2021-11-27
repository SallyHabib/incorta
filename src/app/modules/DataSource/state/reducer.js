import {
  COLUMN_DRAGGED,
  REQUEST_COLUMNS,
  REQUEST_COLUMNS_SUCCESS,
  REQUEST_DATA_SUCCESS,
  ITEM_DELETED,
  ALL_ITEMS_DELETED,
} from "./constants";

export const defaultState = {
  columns: [],
  loading: false,
  data: [],
};

export const dataSourceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_COLUMNS:
      return {
        ...state,
        loading: true,
      };

    case REQUEST_COLUMNS_SUCCESS:
      return {
        ...state,
        columns: action.payload,
        loading: false,
      };

    case REQUEST_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case COLUMN_DRAGGED:
      let newColumns = state.columns.map((column) => {
        if (column.name === action.payload) return { ...column, dragged: true };
        else return column;
      });
      return {
        ...state,
        columns: newColumns,
      };

    case ITEM_DELETED:
      let newItems = state.columns.map((column) => {
        if (column.name === action.payload)
          return { ...column, dragged: false };
        else return column;
      });
      return {
        ...state,
        columns: newItems,
      };

    case ALL_ITEMS_DELETED:
      let newSetOfItems = state.columns.map((column) => {
        return { ...column, dragged: false };
      });
      return {
        ...state,
        columns: newSetOfItems,
      };

    default:
      return state;
  }
};
