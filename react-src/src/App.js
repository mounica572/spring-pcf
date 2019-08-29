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
      messageSubmitClass: "hide",
    };
    this.usernameHandler = this.usernameHandler.bind(this);
    this.usernameClickHandler = this.usernameClickHandler.bind(this);
    this.messageClickHandler = this.messageClickHandler.bind(this);
    this.messageChangeHandler = this.messageChangeHandler.bind(this);


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

  messageChangeHandler(msg){
    this.setState({
      noteText: msg
    })
  }

  messageClickHandler() {
    console.log(this.state.noteText);
    fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        "Content-Type":'application/json'
      },
       body: JSON.stringify({ text: this.state.noteText,  username: this.state.username})
    })
    .then(function (data) {
      console.log('Request success: ', data);
    })
    .catch(function (error) {
      console.log('Request failure: ', error);
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
