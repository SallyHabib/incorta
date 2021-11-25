
import {
  REQUEST_COLUMNS, REQUEST_DATA
} from "./constants";

export const getColumns= () => {
  return {
    type: REQUEST_COLUMNS,
  };
}

export const getData= () => {
  return {
    type: REQUEST_DATA,
  };
}

