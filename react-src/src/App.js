import React, { Component } from "react";
import "./App.css";
import MessageWindow from "./components/MessageWindow";

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
        <div className="container">
          <div className="header"> Message Board App!! </div>
          <input
            type="text"
            ref={input => {
              this.textInput = input;
            }}
            className="textInput"
            value={this.state.noteText}
            onChangeText={noteText => this.updateNoteText(noteText)}
          />
          <div className="btn"> submit </div>
        </div>
        <MessageWindow></MessageWindow>
      </React.Fragment>
    );
  }
}

export default App;
