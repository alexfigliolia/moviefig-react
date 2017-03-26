import React, { Component } from 'react';

class Movies extends Component {
  render() {
    return (
        <div className={this.props.cNames} onClick={this.props.movieClicked}>
            <div id='sort'>
                <h1>Movies</h1>
                <h1>Theater</h1>
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
                            <div className="movie movie-show" key={i} data-index={i}>
                              <img 
                                  height="360" 
                                  width="240" 
                                  src="img/cityweb-small.jpg" 
                                  alt="should be a movie poster"/>

                              <h2 className="movie-title">{title}</h2>
                            </div>
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
