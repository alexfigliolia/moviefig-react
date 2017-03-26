import React, { Component } from 'react';
import Movie from './Movie.js';

class Movies extends Component {
  render() {
    return (
        <div className={this.props.cNames} onClick={this.props.movieClicked}>
            <div id='sort'>
                <h1>Movies</h1>
            </div>
            <div id='error'>
                <h1>Error</h1>
                <p>There was an error! Please try again</p>
                <button id='returnHome' onClick={this.props.goHome}>RETURN HOME</button>
            </div>
            <div id='movies' className={this.props.isLoading}>
                { 
                    this.props.titles.map(function(title, i, props) {
                        return (
                            <Movie key={i} dataIndex={i} title={title} />
                        );
                    })
                }
            </div>
            <div id='more'>
                <button id='loadMore' onClick={this.props.loadMore}>MORE RESULTS</button>
            </div>
        </div>
    );
  }
}

export default Movies;

