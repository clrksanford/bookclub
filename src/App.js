import React, { Component } from 'react';
import axios from 'axios';
import CreateEvent from './components/CreateEvent';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalHidden: true
        }

        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/events/').then(res => {
            console.log(res);
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

              <div id="event-card">
                <h3>November Event: Conundrum</h3>
                <img src="#" alt="Conundrum Cover" />
              </div>

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
