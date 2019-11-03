import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import CreateEvent from './components/CreateEvent';
import { API_BASE_URL } from './constants';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            modalHidden: true,
            pastEvents: [],
            upcomingEvents: []
        }

        this.getList = this.getList.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1>
                Clarks's Queer Book Club ATX
              </h1>
            </header>
            <main>
              <button onClick={this.showModal}>Create an Event</button>
              <CreateEvent
                hideModal={this.hideModal}
                modalHidden={this.state.modalHidden}
              />
              <h2>Upcoming Events</h2>

              {_.map(this.state.upcomingEvents, (event) => {
                return(
                  <div id="event-card" key={event.id}>
                    <h3>{event.title}</h3>
                    <dl>
                      <dt>Date:</dt>
                      <dl>{event.date} @ 7pm</dl>
                    </dl>
                    <img src={event.book.cover_url} alt={event.book.title + " Cover"} />
                  </div>
                );
              })}

              <h2>Past Events</h2>

              {_.map(this.state.pastEvents, (event) => {
                return(
                  <div id="event-card" key={event.id}>
                    <h3>{event.title}</h3>
                    <dl>
                      <dt>Date:</dt>
                      <dl>{event.date} @ 7pm</dl>
                    </dl>
                    <img src={event.book.cover_url} alt={event.book.title + " Cover"} />
                  </div>
                );
              })}
            </main>
          </div>
        );
    }

    getList() {
        axios.get(API_BASE_URL + 'events/').then(res => {
            this._sortEvents(res.data);
            this.setState({events: res.data});
        });
    }

    hideModal() {
        this.setState({ modalHidden: true })
    }

    showModal() {
        this.setState({ modalHidden: false });
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
}

export default App;
