import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Grid, Card, CardContent, Alert } from "@mui/material";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import {
  getColumns,
  getData,
  columnDragged,
  itemDeleted,
  allItemsDeleted,
} from "../state/actions";
import {
  makeSelectColumns,
  makeSelectLoading,
  makeSelectData,
  makeSelectErrorMessage,
} from "../state/selectors";
import Draggable from "react-draggable";
import CustomizedInput from "./CustomizedInput";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
} from "recharts";

const DataSource = ({
  onGetColumns,
  columns,
  errorMessage,
  onGetData,
  data,
  onColumnDragged,
  onItemDeleted,
  onAllItemsDeleted,
}) => {
  const [selectedValueDimension, setSelectedValueDimension] = useState([
    {
      title: "Product",
    },
  ]);
  const [selectedValueMeasure, setSelectedValueMeasure] = useState([
    {
      title: "Cost",
    },
  ]);
  const [yAxisLabels, setYaxisLabels] = useState([]);
  const [xLabel, setXLabel] = useState("");
  const [dataManipulated, setDataManipulated] = useState([]);

  useEffect(() => {
    onGetColumns();
    onGetData({
      measures: selectedValueMeasure.map((item) => {
        return item.title;
      }),
      dimension: selectedValueDimension[0].title,
    });
  }, []);

  useEffect(() => {
    let labels = [];
    for (let i = 1; i < data.length; i++) {
      labels.push(data[i].name);
    }
    setYaxisLabels(labels);
    setXLabel(data[0]?.name);
    setDataManipulated(
      data[0]?.values.map((value, index) => {
        let newObj = {};
        newObj[data[0].name] = value;
        for (let i = 0; i < labels.length; i++) {
          let label = labels[i];
          let labelValue = data.find((item) => item.name === labels[i]);
          newObj[label] = labelValue.values[index];
        }
        return newObj;
      })
    );
  }, [data]);

  useEffect(() => {
    if (selectedValueDimension.length) {
      onGetData({
        measures: selectedValueMeasure.map((item) => {
          return item.title;
        }),
        dimension: selectedValueDimension[0].title,
      });
    } else {
      setDataManipulated([]);
    }
  }, [selectedValueDimension, selectedValueMeasure]);

  let dimensionsArray = [];
  dimensionsArray = columns.reduce((filtered, column) => {
    if (column.function === "dimension") {
      var someNewValue = { title: column.name };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  let measuresArray = [];
  measuresArray = columns.reduce((filtered, column) => {
    if (column.function === "measure") {
      var someNewValue = { title: column.name };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  const handleOnStop = (columnName) => {
    let found = columns.find((column) => column.name === columnName);
    if (
      found.function === "dimension" &&
      !selectedValueDimension.find((item) => item.title === columnName)
    ) {
      if (selectedValueDimension.length)
        onItemDeleted(selectedValueDimension[0].title);
      setSelectedValueDimension([
        {
          title: columnName,
        },
      ]);
    } else if (
      found.function === "measure" &&
      !selectedValueMeasure.find((item) => item.title === columnName)
    ) {
      setSelectedValueMeasure([
        ...selectedValueMeasure,
        {
          title: columnName,
        },
      ]);
    }
    onColumnDragged(columnName);
  };

  const onDelete = (item) => {
    if (item.option === "dimension") {
      onAllItemsDeleted();
      setSelectedValueDimension([]);
      setSelectedValueMeasure([]);
      setXLabel("");
      setYaxisLabels([]);
    } else {
      if (item.option === "measure") {
        setSelectedValueMeasure(
          selectedValueMeasure.filter((measure) => {
            return measure.title !== item.title;
          })
        );
        onItemDeleted(item.title);
      }
    }
  };
  return (
    <React.Fragment>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Grid container flexDirection="column">
        <Grid item xs={12}>
          <Card sx={{ height: 800, width: 1200 }}>
            <CardContent>
              <Grid container flexDirection="row">
                <Grid item xs={3}>
                  {columns.map((column) => {
                    if (!column.dragged)
                      return (
                        <Draggable
                          key={column.name}
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
                  <CustomizedInput
                    defaultValue={{ title: "product" }}
                    optionsProps={dimensionsArray}
                    title={"dimension"}
                    value={selectedValueDimension}
                    onDeleteProp={onDelete}
                  />
                  <CustomizedInput
                    defaultValue={{ title: "cost" }}
                    optionsProps={measuresArray}
                    title={"measure"}
                    value={selectedValueMeasure}
                    onDeleteProp={onDelete}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Grid item xs={12}>
              <div>
                <LineChart
                  width={1150}
                  height={550}
                  data={dataManipulated}
                  margin={{ top: 5, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey={xLabel}
                    style={{ fontSize: 10 }}
                    label={{
                      fontSize: 12,
                      value: xLabel,
                      position: "insideCenterRight",
                      dy: 10,
                    }}
                  />

                  {yAxisLabels.map((label, index) => {
                    return (
                      <YAxis
                        key={index}
                        yAxisId={index}
                        dataKey={label}
                        style={{ fontSize: 10 }}
                        label={{
                          fontSize: 12,
                          value: label,
                          position: "insideCenterRight",
                          dx: 0,
                          dy: 50,
                        }}
                      />
                    );
                  })}
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  {yAxisLabels.map((label, index) => {
                    return (
                      <Line
                        key={label}
                        type="linear"
                        dataKey={label}
                        stroke="#ff7300"
                        yAxisId={index}
                      />
                    );
                  })}
                </LineChart>
              </div>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

DataSource.propTypes = {
  loading: PropTypes.bool,
  shipments: PropTypes.array,
  onGetColumns: PropTypes.func,
  onGetData: PropTypes.func,
  onColumnDragged: PropTypes.func,
  onItemDeleted: PropTypes.func,
  onAllItemsDeleted: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  columns: makeSelectColumns(),
  loading: makeSelectLoading(),
  data: makeSelectData(),
  errorMessage: makeSelectErrorMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetColumns: () => {
      dispatch(getColumns());
    },
    onGetData: (payload) => {
      dispatch(getData(payload));
    },
    onColumnDragged: (payload) => {
      dispatch(columnDragged(payload));
    },
    onItemDeleted: (payload) => {
      dispatch(itemDeleted(payload));
    },
    onAllItemsDeleted: () => {
      dispatch(allItemsDeleted());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DataSource);
