import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";
import UserForm from "./components/UserForm";
import MessageSubmit from "./components/MessageSubmit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: "",
      username: "",
      messageClass: "hide",
      usernameClass: "show",
      messageSubmitClass: "hide"
    };
    this.usernameHandler = this.usernameHandler.bind(this);
    this.usernameClickHandler = this.usernameClickHandler.bind(this);
    this.messageClickHandler = this.messageClickHandler.bind(this);
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

  messageClickHandler(msg) {
    fetch("http://localhost:8090/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: msg })
    })
      .then(function(data) {
        console.log("Request success: ", data);
      })
      .catch(function(error) {
        console.log("Request failure: ", error);
      });
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
          ></MessageWindow>

          <MessageSubmit
            messageClickHandler={this.messageClickHandler}
            messageSubmitClass={this.state.messageSubmitClass}
          ></MessageSubmit>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
