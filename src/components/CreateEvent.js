import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import '../App.css';


class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                title: {
                    value: ''
                },
                date: {
                    value: new Date()
                },
                description: {
                    value: ''
                },
                bookTitle: {
                    value: ''
                },
                bookAuthor: {
                    value: ''
                },
                bookCoverUrl: {
                    value: ''
                },
                bookBlurb: {
                    value: ''
                }
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
    }

    render () {
        return(
            <div className={this.props.modalHidden ? 'hidden' : ''}>
              <h1>Create New Event</h1>
              <p onClick={this.props.hideModal}>x</p>

              <form>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={this.state.formControls.title.value} onChange={this.handleChange}/>

                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleChange}/>

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={this.state.description} onChange={this.handleChange}></textarea>

                <fieldset>
                  <legend>Book Info</legend>

                  <label htmlFor="bookTitle">Book Title:</label>
                  <input type="text" id="bookTitle" name="bookTitle" value={this.state.formControls.bookTitle.value} onChange={this.handleChange}/>

                  <label htmlFor="bookTitle">Book Author:</label>
                  <input type="text" id="bookAuthor" name="bookAuthor" value={this.state.formControls.bookAuthor.value} onChange={this.handleChange}/>

                  <label htmlFor="bookCoverUrl">Book Cover:</label>
                  <input type="text" id="bookCoverUrl" name="bookCoverUrl" value={this.state.formControls.bookCoverUrl.value} onChange={this.handleChange}/>

                  <label htmlFor="bookTitle">Book Blurb:</label>
                  <input type="text" id="bookBlurb" name="bookBlurb" value={this.state.formControls.bookBlurb.value} onChange={this.handleChange}/>
                </fieldset>

                <input type="submit" value="Save" onClick={this.saveEvent}/>
              </form>
            </div>
        )
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }

    saveEvent(e) {
        e.preventDefault();

        let payload = {};
        payload['title'] = this.state.formControls.title.value;
        payload['date'] = this.state.formControls.date.value;
        payload['description'] = this.state.formControls.description.value;

        let book = {};

        book['title'] = this.state.formControls.bookTitle.value;
        book['author'] = this.state.formControls.bookAuthor.value;
        book['cover_url'] = this.state.formControls.bookCoverUrl.value;
        book['blurb'] = this.state.formControls.bookBlurb.value;

        payload['book'] = book;

        axios.post(API_BASE_URL + 'events/', payload).then(res => {
            console.log(res);
        });
    }
}

export default CreateEvent;
