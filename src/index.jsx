import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import cookies from 'js-cookie';
// import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import reducers from './reducers';
import { setUserName } from './actions';

import AppContainer from './containers/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// const userName = cookies.get('userName');

const store = createStore(
  reducers,
  {
    messages: gon.messages,
  },
  applyMiddleware(thunk),
);

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}

store.dispatch(setUserName({ userName: cookies.get('userName') }));

render(
  <Provider store={store}>
    <AppContainer data={{ channels: gon.channels, currentChannelId: gon.currentChannelId }} />
  </Provider>,
  document.getElementById('chat'),
);
