import React, { Component } from 'react';

class Movie extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      "movieClass" : "movie"
    }
  }

  componentDidMount(){
  	var m = document.getElementsByClassName('movie');
	for ( var i=0; i < m.length; i++ ) {
	    // get function in closure, so i can iterate
	    var toggleItemMove = this.toggleMove( i );
	    // reverse stagger order
	    var delay = m.length - i - 1;
	    delay *= 50;
	    // stagger transition with setTimeout
	    setTimeout( toggleItemMove, delay );
	  }
  }

  toggleMove(i){
  	var m = document.getElementsByClassName('movie');
  	var item = m[i];
  	return function() {
	    item.classList.add('movie-show');
	}
  }

  componentWillUnmount(){
  	var m = document.getElementsByClassName('movie');
  	m.classList.remove('movie-show');
  }

  render() {
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

export default Movie;