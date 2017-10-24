import React, { Component } from 'react';

export default class Movie extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      "movieClass" : "movie"
    }
  }

  componentDidMount(){
  	this.m = document.getElementsByClassName('movie');
	  for ( var i=0; i < this.m.length; i++ ) {
	    // get function in closure, so i can iterate
	    const toggleItemMove = this.toggleMove( i );
	    // reverse stagger order
	    let delay = this.m.length - i - 1;
	    delay *= 50;
	    // stagger transition with setTimeout
	    setTimeout( toggleItemMove, delay );
	  }
  }

  toggleMove(i){
  	const item = this.m[i];
  	return function() {
	    item.classList.add('movie-show');
	  }
  }

  componentWillUnmount(){
  	for (let i = 0; i < this.m.length; i++) {
      return function() {
        this.m[i].classList.remove('movie-show');
      }
    }
  }

  render = () => {
    return (
        <div className={this.state.movieClass} data-index={this.props.dataIndex}>
          <img 
            height="360" 
            width="240" 
            src="img/cityweb-small.jpg" 
            alt="should be a movie poster"/>

          <h2 className="movie-title">{this.props.title}</h2>
        </div>
    );
  }
}