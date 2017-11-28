import React from "react";

import { Route, Link } from "react-router-dom";

import { base } from "../firebase/init";
import EditEvent from "./edit";
import ViewEvent from "./view";
import ListEvents from "./list";
import './css/events.css'

export default class EventsIndex extends React.Component {
  render() {
    return (
      <div>
        <label className="menu-label">Events</label>
        <Route exact path={`${this.props.match.url}`} component={ListEvents} />
        <Route path={`${this.props.match.url}/add`} component={EditEvent} />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={ViewEvent}
        />
        <Route
          path={`${this.props.match.url}/:id/edit`}
          component={EditEvent}
        />
      </div>
    );
  }
}
