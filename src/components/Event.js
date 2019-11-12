import React, { Component } from 'react';
import _ from 'lodash';


export default (props) => {
    return(
        <div className="event-card" key={props.event.id}>
          <h3>{props.event.title}</h3>
          {props.rsvpClick ?
            <button
              onClick={() => props.rsvpClick(props.event.id)}
            >
              RSVP
            </button> : ''
          }

          <p>Date: {props.event.dateFormatted} @ 7pm</p>
          <p>Book: <em>{props.event.book.title}</em> by {props.event.book.author}</p>
          <img src={props.event.book.cover_url} alt={props.event.book.title + " Cover"} />

          <h4>Attendees</h4>
          {props.event.attendees.length ?
            <ul>
              {_.map(props.event.attendees, (attendee) => {
                return (
                  <li>{attendee}</li>
                );
              })}
            </ul> : <p>No one RSVP'd yet</p>}
        </div>
    );
}
