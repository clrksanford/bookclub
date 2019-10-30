import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import CreateEvent from './components/CreateEvent';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            modalHidden: true
        }

        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/events/').then(res => {
            console.log(res);
            this.setState({events: res.data});
        })
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
              <h2>Upcoming Events</h2>

              {_.map(this.state.events, (event) => {
                return(
                  <div id="event-card" key={event.id}>
                    <h3>{event.title}</h3>
                    <img src={event.cover_url} alt="Cover" />
                  </div>
                );
              })}

              <CreateEvent
                hideModal={this.hideModal}
                modalHidden={this.state.modalHidden}
              />
            </main>
          </div>
        );
    }

    hideModal() {
        this.setState({ modalHidden: true })
    }

    showModal() {
        this.setState({ modalHidden: false });
    }
}

export default App;
