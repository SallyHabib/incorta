import { createSelector } from "reselect";
import { defaultState } from "./reducer";

const selectDataSource = (state) => state.dataSourceReducer || defaultState;

const makeSelectColumns = () =>
  createSelector(
    selectDataSource,
    (dataSourceState) => dataSourceState.columns
  );

const makeSelectData = () =>
  createSelector(
    selectDataSource,
    (dataSourceState) => dataSourceState.data
  );

const makeSelectLoading = () =>
  createSelector(
    selectDataSource,
    (dataSourceState) => dataSourceState.loading
  );

//  const makeSelectErrorMessage = () =>
//    createSelector(
//     selectDataSource,
//     shipmentsState => shipmentsState.errorMessage,
//    );

export {
  selectDataSource,
  makeSelectColumns,
  makeSelectLoading,
  makeSelectData
  //  makeSelectErrorMessage
};
