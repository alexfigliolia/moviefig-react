import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
    this.props.onZipChange(e.target.value);  
  }

  clearInput = () => { this.setState({ "value" : "" }); } 

  searchZip = () => {
    const zip = this.state.value;
    const reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if( reg.test(zip) ) {
      this.textInput.placeholder = "Enter your zipcode";
      this.props.searchZip();
    } else {
      this.textInput.placeholder = "Enter a valid zipcode";
      this.clearInput();
    }
  }

  render() {
    return (
      <div id='searchZip' className={this.props.cNames}>
        <button id='back' onClick={this.props.goBack}>BACK</button>
        <input 
          id='input' 
          type="text" 
          title="zip code" 
          placeholder="Enter your zip code" 
          autoComplete="on"
          ref={(input) => { this.textInput = input; }}
          value={this.state.value}
          onChange={this.handleChange} />

        <button id='clear' onClick={this.clearInput} >X</button>
        <button id='go' onClick={this.searchZip}>GO!</button>
      </div>
    );
  }
}

