import React from "react";
import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

import { base } from "../firebase/init";
import { withRouter, Link } from "react-router-dom";

export default withRouter(
  class EditEvent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        eventTypes: ['Birthday', 'Challa Bake', 'Corporate', 'Function', 'Internal', 'School']
      };
    }

    componentDidMount() {
      base.fetch(`events/${this.props.match.params.id}`, {
        context: this,
        then: data => {
          this.setState({
            event: {
              ...data,
              start: moment(data.start),
              finish: moment(data.finish)
            }
          });
        }
      });
    }

    onChangeEvent(key, event) {
      const newValue = event.target.value;

      this.onChange(key, newValue);
    }

    onChange(key, value) {
      this.setState(state => ({
        event: {
          ...state.event,
          [key]: value
        }
      }));
    }

    onDelete(event) {
      event.preventDefault();

      if (
        window.confirm(
          `Are you sure you want to delete ${this.state.event.title}?`
        )
      ) {
        base
          .remove(`events/${this.props.match.params.id}`)
          .then(result => this.props.history.push("/events"))
          .catch(error => {
            this.setState({
              error
            });
          });
      }
    }

    onSave(event) {
      event.preventDefault();
      const stateEvent = this.state.event;

      const format = "YYYY-MM-DDTHH:mm:ssZZ";

      base
        .update(`events/${this.props.match.params.id}`, {
          data: {
            ...stateEvent,
            start: stateEvent.start.format(format),
            finish: stateEvent.finish.format(format)
          }
        })
        .then(() => {
          this.props.history.push(`/events/${this.props.match.params.id}`);
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    }

    render() {
      const event = this.state.event;

      var self = this;
      var eventTypeOptions = this.state.eventTypes.map(function(option) {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      });

      return event ? (
        <div className="events-edit-wrapper">
         | <Link className="back-link" to="/">Home</Link> | <Link className="back-link" to="/events">View Events</Link> | <Link className="back-link" to={`/events/${this.props.match.params.id}`}>Back to Event</Link> |
          {this.state.error && <div>Error: {this.state.error.message}</div>}
          <div className="edit-event-form-wrapper">
            <div>
              <label>
                Title:{" "}
                <input
                  className="edit-event-input title-input"
                  type="text"
                  value={event.title}
                  onChange={this.onChangeEvent.bind(this, "title")}
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <textarea
                  className="edit-event-input description-input"
                  value={event.description}
                  onChange={this.onChangeEvent.bind(this, "description")}
                />
              </label>
            </div>
            <div>
              <label>
                Event Type:{" "}
                <select
                  className="edit-event-input event-type-input"
                  value={event.event_type}
                  onChange={this.onChangeEvent.bind(this, "event_type")}>
                  {eventTypeOptions}
                </select>
              </label>
            </div>
            <div>
              <label>
                Start:{" "}
                <DateTimePicker
                  className="edit-event-input date-input"
                  value={event.start}
                  onChange={this.onChange.bind(this, "start")}
                />
              </label>
            </div>
            <div>
              <label>
                End:{" "}
                <DateTimePicker
                  className="edit-event-input date-input"
                  value={event.finish}
                  onChange={this.onChange.bind(this, "finish")}
                />
              </label>
            </div>
            <div>
              <label>
                Max Volunteers:{" "}
                <input
                  className="edit-event-input spots-max-input"
                  type="text"
                  value={event.max_volunteers}
                  onChange={this.onChangeEvent.bind(this, "max_volunteers")}
                />
              </label>
            </div>
          </div>
          <button className="edit-btn delete-btn" onClick={this.onDelete.bind(this)}>Delete Event</button>{" "}
          <button className="edit-btn save-btn" onClick={this.onSave.bind(this)}>Save Event</button>
        </div>
      ) : (
        <div>Loading...</div>
      );
    }
  }
);
