import React, { Component } from "react";
import _ from "lodash";

class MessageWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    this.connect();
  }

  formatDate = date => {
    let d = new Date(date);
    var userTimezoneOffset = d.getTimezoneOffset() * 60000;
    let d2 = new Date(d.getTime() - userTimezoneOffset);
    return d2.toUTCString().slice(0, -4);
  };

  connect() {
    //const evtSource = new EventSource("/stream/messages");
    const evtSource = new EventSource("http://localhost:8090/stream/messages");

    //https://helloapipythagoras.cfapps.io/stream/messages

    evtSource.onopen = function() {
      console.log("Connection to server opened.");
    };
    evtSource.onmessage = e => {
      let tmp = [...this.state.messages, JSON.parse(e.data)];
      tmp = _.uniqBy(tmp, "id");
      this.setState({ messages: tmp });
    };
    evtSource.onerror = function(err) {
      // console.warn("EventSource failed:", err);
    };
  }
  render() {
    let formatDate = this.formatDate;
    let un = this.props.username;
    return (
      <React.Fragment>
        <div className={`message-window ${this.props.messageClass}`}>
          <h3>Welcome, {this.props.username}</h3>
          <ul className="message-list">
            {this.state.messages.map(function(message, index) {
              return (
                <li key={index}>
                  <span className="username">{un} : </span>
                  <span className="message-text"> {message.text} </span>
                  <div className="date">{formatDate(message.createdAt)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default MessageWindow;
