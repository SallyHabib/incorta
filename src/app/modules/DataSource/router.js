import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DataSource from './components/DataSource';

const DataSourceRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DataSource} />
      </Switch>

    </Router>
  )
};

export default DataSourceRoutes;