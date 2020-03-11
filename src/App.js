import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import CreateEvent from './components/CreateEvent';
import Event from './components/Event';
import { API_BASE_URL } from './constants';
import { Button, Container, Typography } from '@material-ui/core';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            messages: [],
            modalHidden: true,
            pastEvents: [],
            upcomingEvents: []
        }

        this.getList = this.getList.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.rsvpClick = this.rsvpClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        axios.get(API_BASE_URL + 'events/').then(res => {
            res.data = this._formatResults(res.data);
            this._sortEvents(res.data);
            this.setState({events: res.data});
        });
    }

    rsvpClick(eventId)  {
        let username = 'loschroe';
        axios.post(API_BASE_URL + `events/${eventId}/rsvp/`, {username: username}).then(res => {
            this.getList();
        });
    }

    saveEvent(payload) {
        axios.post(API_BASE_URL + 'events/', payload).then(res => {
            this.getList();
            let messages = this.state.messages;
            messages.push('Event successfully created!');
            this.setState({ messages });
            this.toggleModal();
        });
    }

    toggleModal() {
        this.state.modalHidden ? this.setState({ modalHidden: false }) : this.setState({ modalHidden: true });
    }

    _formatResults(events) {
        return _.map(events, event => {
              event.dateFormatted = this._formatDate(event.date);
              return event;
        });
    }

    _formatDate(dateStr) {
        let year = dateStr.substring(0,4);
        let month = dateStr.substring(5,7) - 1;
        let day = dateStr.substring(8,10);

        let date = new Date(year, month, day);
        let ccyy = date.getFullYear();
        let mm = this._zeroPad(date.getMonth() + 1);
        let dd = this._zeroPad(date.getDate());

        return mm  + '/' + dd + '/' + ccyy;
    }

    _zeroPad(dateNum) {
        if (dateNum < 10) {
            dateNum = '0' + dateNum;
        }
        return dateNum;
    }

    _sortEvents(events) {
        let upcomingEvents = [];
        let pastEvents = [];

        _.forEach(events, event => {
            let eventDate = new Date(event.date);
            let today = new Date();

            if (eventDate > today) {
                upcomingEvents.push(event);
            } else {
                pastEvents.push(event);
            }
        });

        this.setState({
            upcomingEvents,
            pastEvents
        });
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <Typography variant="h1" component="h1">
                Clark's Queer Book Club ATX
              </Typography>
            </header>
            <main>
              {this.state.messages.length > 0 &&
                <ul>
                  {this.state.messages.forEach((message, index) => {
                    return <li key={index}>{message}</li>
                  })}
                </ul>
              }
              <Button variant="contained" onClick={this.toggleModal}>Create an Event</Button>
              <CreateEvent
                hideModal={this.toggleModal}
                modalHidden={this.state.modalHidden}
                saveEvent={this.saveEvent}
              />
              <Container>
                <Typography variant="h2" component="h2">
                  Upcoming Events
                </Typography>


                {
                  !this.state.upcomingEvents.length ?
                    <p>No upcoming events</p>
                  :
                    _.map(this.state.upcomingEvents, (event) => {
                      return(
                          <Event key={event.id}
                            event={event}
                            rsvpClick={this.rsvpClick}/>
                      );
                    })
                }
              </Container>

              <Container>
                <Typography variant="h2" component="h2">
                  Past Events
                </Typography>

                {
                  !this.state.pastEvents.length ?
                    <p>No past events</p>
                  :
                  _.map(this.state.pastEvents, (event) => {
                    return(
                        <Event key={event.id} event={event}/>
                    );
                  })
                }
              </Container>
            </main>
          </div>
        );
    }
}

export default App;
