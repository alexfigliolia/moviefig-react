import React, { Component } from 'react';
import Times from './Times.js';

export default class Showtimes extends Component {
  render = () => {
    return (
      <div id='showTimes' className={this.props.cNames}>
        <div className='st-title'>
          <h1 id='movieTitleClicked'>{this.props.title}</h1>
          <p id='movieTitleDesc'>{this.props.description}</p>
          <h2>Showtimes:</h2>
        </div>
        <div id='times' ref='hello'>
          { 
            this.props.showtimes.map((theater, i) => {
              console.log(theater);
              return (
                <div 
                  style={{
                    display: theater.length === 1 ? 'none' : 'flex'
                  }}
                  className="showtime" 
                  key={i}>
                  <h3>{theater[0]}</h3>
                  <Times times={theater} key={i}/>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}