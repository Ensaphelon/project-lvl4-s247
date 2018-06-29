import React from 'react';
import Channels from './Channels';
import MessagesContainer from '../containers/Messages';
import Form from '../components/Form';

const App = ({
  channels,
  currentChannelId,
  user,
  sendMessage,
  addMessageState,
}) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-3">
        <div className="app__user-name mb-1">
          {user.name}
        </div>
        <Channels channels={channels} currentChannelId={currentChannelId} />
      </div>
      <div className="col-xs-12 col-sm-9">
        <MessagesContainer user={user} />
      </div>
      <div className="col-xs-12 col-sm-12 pt-3 pb-3">
        <Form user={user} currentChannelId={currentChannelId} addMessageState={addMessageState} sendMessage={sendMessage}  />
      </div>
    </div>
  )
};

export default App;
