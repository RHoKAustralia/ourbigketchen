import React from "react";
import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

import { base } from "../firebase/init";
import { withRouter, Link } from "react-router-dom";

export default withRouter(
  class ViewEvent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidMount() {
      base
        .fetch(`events/${this.props.match.params.id}`, {
          context: this
        })
        .then(data => {
          this.setState({
            event: {
              ...data,
              start: moment(data.start),
              finish: moment(data.finish)
            }
          });

          const userIds = data.users ? Object.keys(data.users) : [];

          const userPromises = userIds.map(userId =>
            base.fetch(`users/${userId}`, {}).then(user => ({
              ...user,
              joined: data.users[userId].joined
            }))
          );

          return Promise.all(userPromises);
        })
        .then(users => {
          this.setState({
            users
          });
        });
    }

    render() {
      const event = this.state.event;

      if (!event) {
        return <div>Loading</div>;
      }

      return (
        <div className="view-wrapper">
           | <Link className="back-link" to="/">Home</Link> | <Link className="back-link" to="/events">View Events</Link> |
          <div className="event-wrapper">
            <div>
              <strong>Title:</strong> {event.title}
            </div>
            <div>
              <strong>Description:</strong> {event.description}
              <br />
            </div>
            <div>
              <strong>Event Type:</strong> {event.event_type}
            </div>
            <div>
              <strong>Start:</strong>{" "}
              {moment(event.start).format("dddd, MMMM Do YYYY, h:mm a")}
            </div>
            <div>
              <strong>End:</strong>{" "}
              {moment(event.finish).format("dddd, MMMM Do YYYY, h:mm a")}
            </div>
            <div>
              <strong>Spots Left:</strong> {event.spots_left}
            </div>
            <div>
              <strong>Max Volunteers:</strong> {event.max_volunteers}
            </div>
            <div>
              <strong>Volunteers:</strong>
              <div>
                <ul>
                  {(this.state.users || []).map(user => (
                    <li key={user.profile.uid}>
                      {user.profile.displayName || user.profile.email} (Enrolled{" "}
                      {moment(user.joined).format("MMMM Do YYYY, h:mm:ss a")})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <br/>
            <br/>
            <br/>
              <Link className="edit-link" to={`/events/${this.props.match.params.id}/edit`}>Edit</Link>
          </div>
        </div>
      );
    }
  }
);
