import produce from "immer";
import { dataSourceReducer } from "../state/reducer";
import { getColumns } from "../state/actions";

describe("dataSourceReducer", () => {
  let defaultState;
  beforeEach(() => {
    defaultState = {
      columns: [],
      loading: false,
      data: [],
      errorMessage: null
    };
  });

  it("should return the initial state", () => {
    const expectedResult = defaultState;
    expect(dataSourceReducer(undefined, {})).toEqual(expectedResult);
  });

  it("should handle the getColumns action correctly", () => {
    const expectedResult = produce(defaultState, (draft) => {
      draft.loading = true;
    });
    expect(dataSourceReducer(defaultState, getColumns())).toEqual(
      expectedResult
    );
  });
});
