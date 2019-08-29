import React, { Component } from "react";
import _ from "lodash";

class MessageSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
  }


  render() {
    return(
      <div className={`message-form ${this.props.messageSubmitClass}`}>
        <form>
          <input id="message" type="text"  />
          <div>
            <a
              type="button"
              className="btn btn-dark"
              onClick={e => this.props.messageClickHandler(e.target.value)}
            >
              Submit
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default MessageSubmit;
