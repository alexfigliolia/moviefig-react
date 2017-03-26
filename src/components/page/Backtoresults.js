import React, { Component } from 'react';

class Back extends Component {
  render() {
    return (
        <button className={this.props.cNames} onClick={this.props.back}>BACK</button>
    );
  }
}

export default Back;