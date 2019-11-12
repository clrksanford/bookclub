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
            <div className="event-card" key={this.props.event.id}>
              <h3>{this.props.event.title}</h3>
              <p>Date: {this.props.event.dateFormatted} @ 7pm</p>
              <p>Book: <em>{this.props.event.book.title}</em> by {this.props.event.book.author}</p>
              <img src={this.props.event.book.cover_url} alt={this.props.event.book.title + " Cover"} />
            </div>
        );
    }
}

export default Event;
