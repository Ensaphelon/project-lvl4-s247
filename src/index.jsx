import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill'; //  TODO: make configuration in webpack
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import reducers from './reducers';
import * as actions from './actions';

import AppContainer from './containers/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const initialState = {
  messages: gon.messages,
  channels: {
    list: gon.channels,
  },
  currentChannelId: gon.currentChannelId,
};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f, // eslint-disable-line
  ),
);

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}

store.dispatch(actions.setUserName({ userName: cookies.get('userName') }));

const socket = io();
socket
  .on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessage(attributes));
  });

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('chat'),
);
