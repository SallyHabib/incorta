import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { getColumns, getData } from "../state/actions";
import { makeSelectColumns, makeSelectLoading } from "../state/selectors";

const DataSource = ({onGetColumns, columns, onGetData}) => {
  useEffect(() => {
    onGetColumns();
    //onGetData();
  }, []);
  
  console.log(columns)
  return (
    (columns.map((column)=>{
      return (
        <div>
          {column.name}
        </div>
      )
    }))
  );
};

// Shipments.propTypes = {
//   loading: PropTypes.bool,
//   shipments: PropTypes.array,
//   onGetShipments: PropTypes.func,
//   onFilterShipments: PropTypes.func,
// };

const mapStateToProps = createStructuredSelector({
  columns: makeSelectColumns(),
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetColumns: () => {
      dispatch(getColumns());
    },
    onGetData: () => {
      dispatch(getData()); 
    }
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DataSource);
