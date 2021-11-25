import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Shipments} from './components/Shimpments';

const ShimpmentsRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Shipments} />
      </Switch>

    </Router>
  )
};

export default ShimpmentsRoutes;