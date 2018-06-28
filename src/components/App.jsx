import React from 'react';
import Channels from './Channels';
import MessagesContainer from '../containers/Messages';
import FormContainer from '../containers/Form';

const App = ({ data: { channels, currentChannelId }, user }) => (
  <div className="row">
    <div className="col-xs-12 col-sm-3">
      <div className="app__user-name mb-1">
        {user.name}
      </div>
      <Channels channels={channels} currentChannelId={currentChannelId} />
    </div>
    <div className="col-xs-12 col-sm-9">
      <MessagesContainer />
    </div>
    <div className="col-xs-12 col-sm-12 pt-3 pb-3">
      <FormContainer />
    </div>
  </div>
);

export default App;
