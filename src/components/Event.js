import React from 'react';
import _ from 'lodash';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Event.css';

export default (props) => {
    return(
        <Card className="event-card">
          <CardContent>
            <Typography variant="h3" component="h3">
              {props.event.title}
            </Typography>

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
              <ul className="attendee-list">
                {_.map(props.event.attendees, (attendee, index) => {
                  return (
                    <li key={props.event.id.toString() + attendee + index}>{attendee}</li>
                  );
                })}
              </ul> : <p>No one RSVP'd yet</p>}
            </CardContent>
        </Card>
    );
}
