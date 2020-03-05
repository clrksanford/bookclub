import React from 'react';
import _ from 'lodash';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import './Event.css';

export default (props) => {
    return(
        <Card className="event-card" variant="outlined">
          <CardHeader
            title={<span><em>{props.event.book.title}</em> by {props.event.book.author}</span>}
            subheader={props.event.dateFormatted}
          />
          {props.rsvpClick &&
            <CardContent>
              <Button
                onClick={() => props.rsvpClick(props.event.id)}
              >
                RSVP
              </Button>
            </CardContent>
          }
          <CardMedia
            className="event-image"
            image={props.event.book.cover_url}
            title={props.event.book.title}
          />
          <CardContent>
            <Typography variant="h5" component="h5">Attendees</Typography>
            {props.event.attendees.length ?
              <List className="attendee-list">
                {_.map(props.event.attendees, (attendee, index) => {
                  let avatarLink = '';
                  if (attendee.profileImage) {
                    avatarLink = attendee.profileImage;
                  }

                  return (
                    <ListItem key={props.event.id.toString() + attendee + index}>
                      <ListItemAvatar>
                        {
                          avatarLink ?
                            <Avatar alt={attendee} src="https://lh3.googleusercontent.com/-YHsYYwUG8b4/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nC6e64g9VAb55cfdf7jIYcJjbpWbg.CMID/s83-c/photo.jpg" />
                          :
                            <PersonIcon />
                        }
                      </ListItemAvatar>
                      <ListItemText primary={attendee} />
                    </ListItem>
                  );
                })}
              </List> : <p>No one RSVP'd yet</p>}
            </CardContent>
        </Card>
    );
}
