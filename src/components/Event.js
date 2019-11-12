import React, { Component } from 'react';


export default (props) => {
    return(
        <div className="event-card" key={props.event.id}>
          <h3>{props.event.title}</h3>
          <button
            onClick={() => props.rsvpClick(props.event.id)}
          >RSVP</button>
          <p>Date: {props.event.dateFormatted} @ 7pm</p>
          <p>Book: <em>{props.event.book.title}</em> by {props.event.book.author}</p>
          <img src={props.event.book.cover_url} alt={props.event.book.title + " Cover"} />
        </div>
    );
}
