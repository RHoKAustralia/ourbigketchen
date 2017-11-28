import React from "react";

import { Route, Link } from "react-router-dom";

import { base } from "../firebase/init";
import EventsVolunteers from "./events-volunteers";
import './css/reports.css'

export default class ReportsIndex extends React.Component {
  render() {
    return (
      <div>
        <label className="menu-label">Report</label>
        <Route exact path={`${this.props.match.url}`} component={EventsVolunteers} />
      </div>
    );
  }
}
