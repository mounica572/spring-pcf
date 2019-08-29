import React, { Component } from "react";
import _ from "lodash";

class MessageWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.formatDate = this.formatDate.bind(this);
    this.messagesEnd = null;
  }

  componentDidMount() {
    this.connect();
  }

  componentDidUpdate() {
    this.scrollToBottom();
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

    evtSource.onopen = function() {};
    evtSource.onmessage = e => {
      let tmp = [...this.state.messages, JSON.parse(e.data)];
      tmp = _.uniqBy(tmp, "id");
      this.setState({ messages: tmp });
    };
    evtSource.onerror = function(err) {
      // console.warn("EventSource failed:", err);
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
    //this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
  };

  render() {
    let formatDate = this.formatDate;
    let un = this.props.username;
    return (
      <React.Fragment>
        <div className={`welcome-pane ${this.props.messageClass}`}>
          <h3>Welcome, {this.props.username}</h3>
          <hr />
        </div>
        <div className={`message-window ${this.props.messageClass}`}>
          <ul
            className="message-list"
            ref={el => {
              this.messagesEnd = el;
            }}
          >
            {this.state.messages.map(function(message, index) {
              return (
                <li key={index}>
                  <span className="username">
                    {message.usenarme ? message.usenarme : un} :{" "}
                  </span>
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
