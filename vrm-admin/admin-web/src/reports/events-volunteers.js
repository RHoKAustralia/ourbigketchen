import React from "react";
import moment from "moment";

import { Route, Link } from "react-router-dom";
import { base } from "../firebase/init";
import { withRouter } from "react-router-dom";

const formatDate = "DD MMM YYYY (dddd)";
const formatTime = "h:mma";

export default withRouter(
  class EventsVolunteers extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        events: [],
        users: [],
      };
    }

    componentDidMount() {
      base.listenTo("users", {
        context: this,
        asArray: true,
        keepKeys: true,
        then: data => {
          let users = {};
          data.forEach(user => {
            users[user.key] = {
              key: user.key,
              name: user.profile.displayName ? user.profile.displayName : user.profile.email,
              email: user.profile.email,
            };
          });
          this.setState({
            users
          });
        }
      });

      base.listenTo("events", {
        context: this,
        asArray: true,
        keepKeys: true,
        then: data => {
          data = data.sort((a, b) => a.start.localeCompare(b.start));
          let events = {};
          data.forEach(event => {
            event.start = moment(event.start);
            event.finish = moment(event.finish);
            if(event.users) {
              event.users = Object.entries(event.users).map(user => ({key: user[0], active: (user[1].resigned === undefined)}));
            }
            else {
              event.users = [];
            }
            let date = event.start.format(formatDate);
            if(events[date] === undefined)
              events[date] = {events: [], date: date};
            events[date].events.push(event);
          });

          this.setState({
            events: Object.values(events)
          });
        }
      });
    }

    render() {
      return (
        <div>
          | <Link className="back-link" to="/">Home</Link> |

          {this.state.error && <div>{this.state.error.message}</div>}

          <div className="report-title">Volunteers per Event</div>

          {this.state.events.map(date => (
            <div key={date.date}>
              <div className="group-header">{date.date}</div>
              {date.events.map(event => (
                <div className="row" key={event.key}>
                  <Link to={`${this.props.match.url}/${event.key}`}>
                    {event.title}
                  </Link>
                  &nbsp;&nbsp;({event.event_type})&nbsp;&nbsp;
                  {event.start.format(formatTime)}&nbsp;-&nbsp;
                  {event.finish.format(formatTime)}
                  {event.users.map(user => (
                    <li className="user" key={user.key}>
                      <Link to={`/users/${user.key}`}>
                        {this.state.users[user.key].name}
                      </Link>&nbsp;
                      ({this.state.users[user.key].email})
                      &nbsp;&nbsp;{user.active ? '' : '(cancelled)'}
                    </li>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  }
);
