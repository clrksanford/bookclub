import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import '../App.css';


class Event extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="event-card" key={this.props.event.id}>
              <h3>{this.props.event.title}</h3>
              <dl>
                <dt>Date:</dt>
                <dl>{this.props.event.dateFormatted} @ 7pm</dl>
              </dl>
              <img src={this.props.event.book.cover_url} alt={this.props.event.book.title + " Cover"} />
            </div>
        );
    }
}

export default Event;
