import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      noteText: '',
    }
  }

  updateNoteText(noteText){
    this.setState({ noteText: noteText.target.value })  
  }

  render() { 
    return  ( 
      <div className="container">
    
        <div className="header"> Message Board App!! </div>
      
  
        <input type="text" 
         ref={((input) => {this.textInput = input})} 
         className="textInput"
         value={this.state.noteText}
         onChangeText={noteText => this.updateNoteText(noteText)}     
        />
        
        <div className="btn"> submit </div>
      </div>
    );
  }

  }


export default App;