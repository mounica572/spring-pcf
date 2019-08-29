import React, { Component } from "react";
class UserForm extends Component {
  constructor(props) {
    super(props);
  }
  onChange(e) {
    this.setState({ username: e.target.value });
    console.log(this.state.username);
  }
  render() {
    return (
      <div className="user-form">
        <div className="header"> Please Enter a User Name </div>
        <input
          type="text"
          className="textInput"
          onChange={e => this.props.usernameHandler(e.target.value)}
        />
        <div>
          <a type="button" className="btn btn-dark">
            Submit
          </a>
        </div>
      </div>
    );
  }
}

export default UserForm;
