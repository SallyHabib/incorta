import { REQUEST_COLUMNS, REQUEST_COLUMNS_SUCCESS } from "../state/constants";
import { getColumns, getColumnsSuccess } from "../state/actions";

describe("Columns Actions", () => {
  describe("getColumnsSuccess", () => {
    it("should return the  from the api", () => {
      const columns = [{ title: "product", function: "dimension" }];
      const expectedResult = {
        type: REQUEST_COLUMNS_SUCCESS,
        columns,
      };
      expect(getColumnsSuccess(shipments)).toEqual(expectedResult);
    });
  });

  describe("getColumns", () => {
    it("should fire a request to get the columns from the api", () => {
      const expectedResult = {
        type: REQUEST_COLUMNS,
      };
      expect(getColumns()).toEqual(expectedResult);
    });
  });
});