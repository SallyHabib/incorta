
import {
  REQUEST_SHIPMENTS
} from "./constants";

export const getShipments= () => {
  return {
    type: REQUEST_SHIPMENTS,
  };
}
