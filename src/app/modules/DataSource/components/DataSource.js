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
import Draggable from "react-draggable";
import CustomizedHook from "./CustomizedHook";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from "recharts";

const DataSource = ({ onGetColumns, columns, onGetData, data }) => {
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
    let found = columns.find((column) => column.name === columnName);
    if (
      found.function === "dimension" &&
      !selectedValueDimension.find((item) => item.title === columnName)
    ) {
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
  };

  const onDelete = (item) => {
    if (item.option === "dimension") {
      setSelectedValueDimension([]);
      setSelectedValueMeasure([]);
    } else {
      if (item.option === "measure") {
        setSelectedValueMeasure(
          selectedValueMeasure.filter((measure) => {
            return measure.title !== item.title;
          })
        );
      }
    }
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
                  value={selectedValueDimension}
                  onDeleteProp={onDelete}
                />
                <CustomizedHook
                  defaultValue={{ title: "cost" }}
                  optionsProps={measuresArray}
                  title={"measure"}
                  value={selectedValueMeasure}
                  onDeleteProp={onDelete}
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
                <XAxis dataKey={xLabel} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                {yAxisLabels.map((label, index) => {
                  return (
                    <Line
                      type="monotone"
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
  );
};

DataSource.propTypes = {
  loading: PropTypes.bool,
  shipments: PropTypes.array,
  onGetShipments: PropTypes.func,
  onFilterShipments: PropTypes.func,
};

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
    onGetData: (payload) => {
      dispatch(getData(payload));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DataSource);
