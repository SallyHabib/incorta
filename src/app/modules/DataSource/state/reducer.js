import {
  REQUEST_COLUMNS,
  REQUEST_COLUMNS_FAILED,
  REQUEST_COLUMNS_SUCCESS,
  REQUEST_DATA_SUCCESS,
} from "./constants";

export const defaultState = {
  columns: [],
  loading: false,
};

export const dataSourceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_COLUMNS:
      return {
        ...state,
        loading: true,
      };

    case REQUEST_COLUMNS_SUCCESS:
		console.log("HERE", action.payload)
      return {
        ...state,
        columns: action.payload,
        loading: false,
      };

	case REQUEST_DATA_SUCCESS:
		return {
			...state,
			data: action.payload,
			loading: false
		}

    default:
      return state;
  }
};
