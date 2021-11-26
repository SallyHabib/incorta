import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Grid, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { getColumns, getData } from "../state/actions";
import {
  makeSelectColumns,
  makeSelectLoading,
  makeSelectData,
} from "../state/selectors";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Draggable, { MouseEvent, Object } from "react-draggable";
import CustomizedHook from "./CustomizedHook";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";

const DataSource = ({ onGetColumns, columns, onGetData, data }) => {
  const Root = styled("div")(
    ({ theme }) => `
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    font-size: 14px;
  `
  );

  const Label = styled("label")`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;

  const InputWrapper = styled("div")(
    ({ theme }) => `
    width: 300px;
    border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
      color: ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
  );

  useEffect(() => {
    onGetColumns();
    onGetData();
  }, []);

  let dataManipulated = data[0]?.values.map((value, index) => {
    return { product: value, cost: data[1]?.values[index] };
  });

  let dimensionsArray = [];
  dimensionsArray = columns.reduce(function (filtered, column) {
    if (column.function === "dimension") {
      var someNewValue = { title: column.name };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  let measuresArray = [];
  measuresArray = columns.reduce(function (filtered, column) {
    if (column.function === "measure") {
      var someNewValue = { title: column.name };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  const handleOnStop = (columnName) => {
    console.log(columnName);
  };
  return (
    <Grid container flexDirection="column">
      <Grid item xs={2}>
        <Card sx={{ height: 800, width: 1000 }}>
          <CardContent>
            <Grid container flexDirection="row">
              <Grid item xs={3}>
                {columns.map((column) => {
                  return (
                    <Draggable
                      grid={[25, 25]}
                      start={{ x: 0, y: 0 }}
                      zIndex={1000}
                      onStop={() => handleOnStop(column.name)}
                    >
                      <div>{column.name}</div>
                    </Draggable>
                  );
                })}
              </Grid>
              <Grid item xs={9}>
                <CustomizedHook
                  defaultValue={{ title: "product" }}
                  optionsProps={dimensionsArray}
                  title={"dimension"}
                />
                <CustomizedHook
                  defaultValue={{ title: "cost" }}
                  optionsProps={measuresArray}
                  title={"measure"}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Grid item xs={10}>
            <div>
              <LineChart
                width={1000}
                height={550}
                data={dataManipulated}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="product" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#ff7300"
                  yAxisId={0}
                />
              </LineChart>
            </div>
          </Grid>
        </Card>
      </Grid>
    </Grid>
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
  data: makeSelectData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetColumns: () => {
      dispatch(getColumns());
    },
    onGetData: () => {
      dispatch(getData());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DataSource);
