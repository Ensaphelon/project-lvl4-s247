import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
// import io from 'socket.io-client';

import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}

const userName = cookies.get('userName');

render(
  <App data={{ ...gon, userName }} />,
  document.getElementById('chat'),
);
