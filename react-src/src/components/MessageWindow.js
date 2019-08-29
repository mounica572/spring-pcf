import React, { Component } from "react";
import _ from "lodash";

class MessageWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.connect();
  }

  formatDate = date => {
    console.log("format: " + date);
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
      console.log("meesage: ", e.data);
      let tmp = [...this.state.messages, JSON.parse(e.data)];
      tmp = _.uniqBy(tmp, "id");
      this.setState({ messages: tmp });
      console.log(this.state.messages);
    };
    evtSource.onerror = function(err) {
      console.warn("EventSource failed:", err);
    };
  }
  render() {
    this.formatDate("2019-08-27T18:29:53.162+0000");
    return (
      <div className="message-window">
        <ul className="message-list">
          {this.state.messages.map(function(message, index) {
            return (
              <li key={index}>
                {message.text} <span className="date"></span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MessageWindow;
