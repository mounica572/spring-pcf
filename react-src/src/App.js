import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";
import UserForm from "./components/UserForm";
import MessageSubmit from "./components/MessageSubmit";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: "",
      username: "",
      messageClass: "hide",
      usernameClass: "show",
      messageSubmitClass: "hide",
      messages: []
    };
    this.usernameHandler = this.usernameHandler.bind(this);
    this.usernameClickHandler = this.usernameClickHandler.bind(this);
    this.messageClickHandler = this.messageClickHandler.bind(this);
    this.messageChangeHandler = this.messageChangeHandler.bind(this);
    this.messagesListHandler = this.messagesListHandler.bind(this);
    this.stompClient = null;
  }

  /*function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}*/

  /*function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}*/

  /*function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}*/

  componentDidMount() {
    this.connectSocket();
  }

  connectSocket() {
    console.log("Stomp", Stomp);
    let messagesListHandler = this.messagesListHandler;
    var socket = new SockJS("/mywebsockets");
    this.stompClient = Stomp.over(socket);
    let stmp = this.stompClient;
    stmp.connect({}, function(frame) {
      // setConnected(true);
      console.log("Connected: " + frame);
      stmp.subscribe("/topic/messages", function(message) {
        console.log("socket: ", message);
        let msg = JSON.parse(message.body);
        messagesListHandler([msg]);
      });
    });
  }

  usernameHandler(un) {
    this.setState({
      username: un
    });
  }

  usernameClickHandler() {
    this.setState({
      messageClass: "show",
      messageSubmitClass: "show",
      usernameClass: "hide"
    });
  }

  messageChangeHandler(msg) {
    this.setState({
      noteText: msg
    });
  }

  messagesListHandler(msgArray) {
    let tmp = _.uniqBy([...this.state.messages, ...msgArray], "id");
    tmp.sort(function compare(a, b) {
      var dateA = new Date(a.createdAt);
      var dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    this.setState({
      messages: tmp
    });
  }

  messageClickHandler() {
    this.stompClient.send(
      "/app/hello",
      {},
      JSON.stringify({
        username: this.state.username,
        text: this.state.noteText
      })
    );
    /* console.log(this.state.noteText);
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.noteText,
        username: this.state.username
      })
    })
      .then(function(data) {
        console.log("Request success: ", data);
      })
      .catch(function(error) {
        console.log("Request failure: ", error);
      });*/
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <UserForm
          usernameClass={this.state.usernameClass}
          usernameHandler={this.usernameHandler}
          usernameClickHandler={this.usernameClickHandler}
        ></UserForm>

        <div class="chat-container">
          <MessageWindow
            messageClass={this.state.messageClass}
            username={this.state.username}
            messages={this.state.messages}
            messagesListHandler={this.messagesListHandler}
          ></MessageWindow>

          <MessageSubmit
            messageChangeHandler={this.messageChangeHandler}
            messageClickHandler={this.messageClickHandler}
            messageSubmitClass={this.state.messageSubmitClass}
          ></MessageSubmit>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
