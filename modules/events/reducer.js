import { ActionType } from './actions';

export const initialState = {
  query: '',
  offset: 0,
  limit: 50,
  events: [],
  eventsLoading: true,
  addEventLoading: false,
  removeEventLoadingById: [],
  removeAllEventsLoading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.INITIALIZE_VIEW:
      return initialState;

    case ActionType.CHANGE_QUERY_FILTER:
      return { ...state, query: action.query };

    case ActionType.CHANGE_PAGINATION:
      return { ...state, limit: action.limit, offset: action.offset };

    case ActionType.FETCH_EVENTS_START:
      return { ...state, eventsLoading: true };

    case ActionType.FETCH_EVENTS_SUCCESS:
      return { ...state, eventsLoading: false, events: action.events };

    case ActionType.FETCH_EVENTS_FAILURE:
      return { ...state, eventsLoading: false };
      
    case ActionType.ADD_EVENT_START:
      return { ...state, addEventLoading: true };
      
    case ActionType.ADD_EVENT_SUCCESS:
      return { ...state, addEventLoading: false };
      
    case ActionType.ADD_EVENT_FAILURE:
      return { ...state, addEventLoading: false };

    case ActionType.REMOVE_EVENT_START:
      return { ...state, removeEventLoadingById: { ...state.removeEventLoadingById, [action.eventId]: true } };

    case ActionType.REMOVE_EVENT_SUCCESS:
      return { ...state, removeEventLoadingById: { ...state.removeEventLoadingById, [action.eventId]: false } };

    case ActionType.REMOVE_EVENT_FAILURE:
      return { ...state, removeEventLoadingById: { ...state.removeEventLoadingById, [action.eventId]: false } };

    case ActionType.REMOVE_ALL_EVENTS_START:
      return { ...state, removeAllEventsLoading: true };

    case ActionType.REMOVE_ALL_EVENTS_SUCCESS:
      return { ...state, removeAllEventsLoading: false };

    case ActionType.REMOVE_ALL_EVENTS_FAILURE:
      return { ...state, removeAllEventsLoading: false };

    default:
      return state;
  }
}
