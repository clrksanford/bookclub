import React, { Component } from 'react';
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
                book: {
                    value: 0
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

                <label htmlFor="book">Book:</label>
                <select id="book" name="book" value={this.state.book} onChange={this.handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

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
        console.log(this.state.formControls);
    }
}

export default CreateEvent;
