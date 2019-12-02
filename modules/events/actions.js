import * as EventsAPI from '../../services/EventsAPI';

export const ActionType = {
  INITIALIZE_VIEW: 'INITIALIZE_VIEW',

  CHANGE_QUERY_FILTER: 'CHANGE_QUERY_FILTER',
  CHANGE_PAGINATION: 'CHANGE_PAGINATION',

  FETCH_EVENTS: 'FETCH_EVENTS',
  FETCH_EVENTS_START: 'FETCH_EVENTS_START',
  FETCH_EVENTS_SUCCESS: 'FETCH_EVENTS_SUCCESS',
  FETCH_EVENTS_FAILURE: 'FETCH_EVENTS_FAILURE',

  ADD_EVENT: 'ADD_EVENT',
  ADD_EVENT_START: 'ADD_EVENT_START',
  ADD_EVENT_SUCCESS: 'ADD_EVENT_SUCCESS',
  ADD_EVENT_FAILURE: 'ADD_EVENT_FAILURE',

  REMOVE_EVENT: 'REMOVE_EVENT',
  REMOVE_EVENT_START: 'REMOVE_EVENT_START',
  REMOVE_EVENT_SUCCESS: 'REMOVE_EVENT_SUCCESS',
  REMOVE_EVENT_FAILURE: 'REMOVE_EVENT_FAILURE',

  REMOVE_ALL_EVENTS: 'REMOVE_ALL_EVENTS',
  REMOVE_ALL_EVENTS_START: 'REMOVE_ALL_EVENTS_START',
  REMOVE_ALL_EVENTS_SUCCESS: 'REMOVE_ALL_EVENTS_SUCCESS',
  REMOVE_ALL_EVENTS_FAILURE: 'REMOVE_ALL_EVENTS_FAILURE',
};

export function initializeView() {
  return { type: ActionType.INITIALIZE_VIEW };
}

export function changeQueryFilter(query) {
  return dispatch => {
    dispatch({ type: ActionType.CHANGE_QUERY_FILTER, query });
    dispatch(fetchEvents());
  };
}

export function changePagination({ offset, limit }) {
  return dispatch => {
    dispatch({ type: ActionType.CHANGE_PAGINATION, offset, limit });
    dispatch(fetchEvents());
  };
}

export function fetchEvents() {
  return (dispatch, getState) => {
    const { query, limit, offset } = getState().events;
    dispatch({ type: ActionType.FETCH_EVENTS_START });
    EventsAPI.fetchEvents({ query, limit, offset }).then(
      events => {
        dispatch({ type: ActionType.FETCH_EVENTS_SUCCESS, events });
      },
      error => {
        dispatch({ type: ActionType.FETCH_EVENTS_FAILURE, error });
      }
    )
  }
}

export function addEvent(eventData) {
  return dispatch => {
    dispatch({ type: ActionType.ADD_EVENT_START });
    EventsAPI.addEvent(eventData).then(
      event => {
        dispatch({ type: ActionType.ADD_EVENT_SUCCESS, event });
        dispatch(fetchEvents());
      },
      error => {
        dispatch({ type: ActionType.ADD_EVENT_FAILURE, error });
      }
    )
  }
}

export function removeEvent(eventId) {
  return dispatch => {
    dispatch({ type: ActionType.REMOVE_EVENT_START, eventId });
    EventsAPI.removeEvent(eventId).then(
      event => {
        dispatch({ type: ActionType.REMOVE_EVENT_SUCCESS, eventId });
        dispatch(fetchEvents());
      },
      error => {
        dispatch({ type: ActionType.REMOVE_EVENT_FAILURE, eventId, error });
      }
    )
  }
}

export function removeAllEvents() {
  return dispatch => {
    dispatch({ type: ActionType.REMOVE_ALL_EVENTS_START });
    EventsAPI.removeAllEvents().then(
      event => {
        dispatch({ type: ActionType.REMOVE_ALL_EVENTS_SUCCESS });
        dispatch(fetchEvents());
      },
      error => {
        dispatch({ type: ActionType.REMOVE_ALL_EVENTS_FAILURE, error });
      }
    )
  }
}