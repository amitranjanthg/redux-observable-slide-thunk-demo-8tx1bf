import React from 'react';

function formatDate(date) {
  return new Date(date).toString();
}

const EventItem = ({ event, deleteLoading, onDelete }) => {
  return (
    <div className="EventItem">
      <div className="EventItem__label">
        <b>{event.name}</b> - {event.place}, {formatDate(event.date)}
      </div>
      {" "}
      <a className="EventItem__button" disabled={deleteLoading} onClick={onDelete}>{deleteLoading ? '(delete in progress...)' : '(delete)'}</a>
    </div>
  )
}

export default EventItem;
