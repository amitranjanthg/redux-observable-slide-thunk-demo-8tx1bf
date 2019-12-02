import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import EventsList from './modules/events/EventsList';
import { rootReducer } from './modules/root';

import './style.css';

const middlewares = [
  thunk
];
const store = createStore(rootReducer, 
  applyMiddleware(...middlewares)
);

render((
  <Provider store={store}>
    <EventsList />
  </Provider>
), document.getElementById('root'));
