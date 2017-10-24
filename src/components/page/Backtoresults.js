import React, { Component } from 'react';

export default class Back extends Component {
  render = () => {
    return (
    	<button className={this.props.cNames} onClick={this.props.back}>BACK</button>
    );
  }
}