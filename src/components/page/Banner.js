import React, { Component } from 'react';

export default class Banner extends Component {
  render = () => {
    return (
      <div id='banner' className={this.props.cNames}>
        <div>
          <h1>Movie Times</h1>
          <h2>Wherever that lousy date takes you</h2>
          <button className='search' onClick={this.props.searchToggle}>SEARCH</button>
        </div>
      </div>
    );
  }
}
