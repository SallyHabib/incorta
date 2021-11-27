import { selectDataSource, makeSelectColumns } from '../state/selectors';

describe('selectDataSource', () => {
  it('should select the dataSource state', () => {
    const dataSourceState = {
      columns: [],
      loading: false,
      data:[],
      errorMessage: null
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
