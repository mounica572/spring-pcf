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
      messageClass: "hide",
      usernameClass: "show"
    };
    this.usernameHandler = this.usernameHandler.bind(this);
    this.usernameClickHandler = this.usernameClickHandler.bind(this);
  }

  usernameHandler(un) {
    this.setState({
      username: un
    });
  }

  usernameClickHandler() {
    this.setState({ messageClass: "show", usernameClass: "hide" });
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
        <MessageWindow
          messageClass={this.state.messageClass}
          username={this.state.username}
        ></MessageWindow>
      </React.Fragment>
    );
  }
}

export default App;
