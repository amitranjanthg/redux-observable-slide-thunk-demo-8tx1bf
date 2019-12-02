import { combineReducers } from 'redux';
import { reducer as eventsReducer } from './events';

export const rootReducer = combineReducers({
  events: eventsReducer
});