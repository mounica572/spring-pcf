import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";
import UserForm from "./components/UserForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: "",
      username: ""
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
        <MessageWindow></MessageWindow>
      </React.Fragment>
    );
  }
}

export default App;
