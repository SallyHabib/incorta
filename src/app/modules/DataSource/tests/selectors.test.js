import { selectShipments, makeSelectShipments } from '../state/selectors';
import myData from "../state/data.json";

describe('selectDataSource', () => {
  it('should select the dataSource state', () => {
    const dataSourceState = {
      columns: [],
      loading: false,
      data:[]
    };
    const mockedState = {
      columns: dataSourceState,
    };
    expect(selectDataSource(mockedState)).toEqual(dataSourceState);
  });
});

describe('makeSelectColumns', () => {
  const columnsSelector = makeSelectColumns();
  it('should select the columns', () => {
    const columns = []
    const mockedState = {
      columns: {
        columns,
      },
    };
    expect(columnsSelector(mockedState)).toEqual(columns);
  });
});
