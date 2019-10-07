import React, { Component } from 'react';
import '../App.css';


class CreateEvent extends Component {
    render () {
        console.log(this.props.modalHidden);
        return(
            <div className={this.props.modalHidden ? 'hidden' : ''}>
              <h1>Create New Event</h1>
              <p onClick={this.props.hideModal}>x</p>
            </div>
        )
    }
}

export default CreateEvent;
