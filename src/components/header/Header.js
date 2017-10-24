import React, { Component } from 'react';

export default class Header extends Component {
  render = () => {
    return (
      <header id='header' className={this.props.cNames}>
        <h1 onClick={this.props.goHome}>MOVIE FIG</h1>
        <div id='search' className='search' onClick={this.props.searchToggle}>
          <img src='icons/0135-search.svg' alt='search by zipcode' />
        </div>
      </header>
    );
  }
}
