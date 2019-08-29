import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";
import UserForm from "./components/UserForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: "",
      username: "",
      messageClass: "hide"
    };
    this.usernameHandler = this.usernameHandler.bind(this);
  }

  usernameHandler(un) {
    this.setState({
      username: un
    });
    console.log("username in app:", this.state.username);
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <UserForm usernameHandler={this.usernameHandler}></UserForm>
        <MessageWindow messageClass={this.state.messageClass}></MessageWindow>
      </React.Fragment>
    );
  }
}

export default App;
