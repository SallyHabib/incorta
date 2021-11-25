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
import Draggable from "react-draggable";
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
  console.log(dataManipulated);
  return (
    <Grid container flexDirection="row">
      <Grid item xs={2}>
        <Card sx={{ height: 500 }}>
          <CardContent>
            {columns.map((column) => {
              return (
                <Draggable grid={[100,100]}>
                  <div>{column.name}</div>
                </Draggable>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10}>
        <Grid container flexDirection="column">
          <div>
            <InputWrapper
            // ref={setAnchorEl}
            // className={focused ? "focused" : ""}
            >
              {/* {value.map((option, index) => ( */}
              <div>
                <span>"hello span"</span>
                <CloseIcon onClick={console.log("delte")} />
              </div>
              {/* ))} */}
              {/* <input {...getInputProps()} /> */}
            </InputWrapper>
          </div>
          <div>
            <LineChart
              width={1000}
              height={600}
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
