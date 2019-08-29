import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";
import UserForm from "./components/UserForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteText: ""
    };
  }

  updateNoteText(noteText) {
    this.setState({ noteText: noteText.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <UserForm></UserForm>
        <MessageWindow></MessageWindow>
      </React.Fragment>
    );
  }
}

export default App;
