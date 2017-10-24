import React, { Component } from 'react';

export default class Times extends Component {
  render = () => {
    return (
      <div className="time-wrapper">
        { 
          this.props.times.map((time, i) => {
            if(i>0) {
              return (
                <div className='time-button' key={time}>
                  <h4>{time}</h4>
                  <button>BUY TICKETS</button>
                </div>
              );
            }
          })
        }
      </div>
    );
  }
}