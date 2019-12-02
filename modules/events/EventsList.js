import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  initializeView,
  changeQueryFilter,
  changePagination,
  fetchEvents,
  addEvent,
  removeEvent,
  removeAllEvents
} from './actions';
import EventItem from './EventItem';

export class EventsList extends React.Component {
  state = {
    newEventName: ''
  };

  componentDidMount() {
    this.props.initializeView();
    this.props.fetchEvents();
  }
  
  render() {
    return (
      <div>
        <h2>Add new event</h2>
        <form 
          onSubmit={event => {
            event.preventDefault();
            this.props.addEvent({
              name: this.state.newEventName,
              place: 'Warsaw, Poland'
            });
            this.setState({ newEventName: '' });
          }}>
          <input 
            value={this.state.newEventName}
            onChange={event => {
              this.setState({ newEventName: event.target.value });
            }}
            placeholder="Event name"
            />
          <button type="submit" disabled={this.props.addEventLoading}>{this.props.addEventLoading ? 'adding...' : 'Add event'}</button>
        </form>

        <h2>Browse events</h2>

        <input 
          value={this.props.query} 
          placeholder="Search for event name..." 
          onChange={event => this.props.changeQueryFilter(event.target.value)}
          />

        <select 
          value={this.props.limit}
          onChange={event => this.props.changePagination({ limit: +event.target.value, offset: 0 })}>
          <option value={10}>Limit per page: 10</option>
          <option value={50}>Limit per page: 50</option>
          <option value={100}>Limit per page: 100</option>
        </select>

        <select 
          value={(this.props.offset / this.props.limit) + 1}
          onChange={event => this.props.changePagination({ offset: (+event.target.value - 1) * this.props.limit, limit: this.props.limit })}>
          <option value={1}>Page: 1</option>
          <option value={2}>Page: 2</option>
          <option value={3}>Page: 3</option>
        </select>

        {this.props.eventsLoading && <p>'fetching...'</p>}
        
        {(!this.props.eventsLoading && this.props.events.length === 0) ? (
          <p>No events found.</p>
        ) : (
          <div style={{opacity: this.props.eventsLoading ? 0.5 : 1}}>
            {this.props.events.map(event => (
              <EventItem 
                key={event.id}
                event={event} 
                deleteLoading={!!this.props.removeEventLoadingById[event.id]}
                onDelete={this.props.removeEvent.bind(this, event.id)} 
                />
            ))}
          </div>
        )}

        <br />

        {this.props.events.length > 0 && (
          <button 
            disabled={this.props.removeAllEventsLoading} 
            onClick={this.props.removeAllEvents.bind(this)}>
            X Delete all events
          </button>
        )}
      </div>
    );
  }
}

const ConnectedEventsList = connect(
  state => state.events,
  dispatch => bindActionCreators({
    initializeView,
    changeQueryFilter,
    changePagination,
    fetchEvents,
    addEvent,
    removeEvent,
    removeAllEvents
  }, dispatch)
)(EventsList)

export default ConnectedEventsList;