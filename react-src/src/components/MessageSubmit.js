import React, { Component } from "react";
import _ from "lodash";

class MessageSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  render() {
    return(
      <div className={`message-container ${this.props.messageSubmitClass}`}>
        <form>
          <input className='message-form' 
            id="message" 
            type="text"
            onChange={e => this.props.messageChangeHandler(e.target.value)}
            />
          <div>
            <a
              type="button"
              className="btn btn-dark"
              onClick={e => this.props.messageClickHandler()}
            >
             &rarr;   
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default MessageSubmit;
