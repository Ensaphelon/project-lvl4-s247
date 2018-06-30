import React from 'react';
import Channels from './Channels';
import MessagesContainer from '../containers/Messages';
import Form from '../components/Form';

const App = ({
  channels,
  currentChannelId,
  user,
  sendMessage,
  sendMessageState,
  uiState,
}) => {
  return (
    <div>
      <div className="app__user-name mb-1">
        <span className="badge badge-light">Current user: {user.name}</span>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <Channels channels={channels} currentChannelId={currentChannelId} />
        </div>
        <div className="col-xs-12 col-sm-9">
          <MessagesContainer user={user} sendMessageState={sendMessageState} />
        </div>
        <div className="col-xs-12 col-sm-12 pt-3 pb-3">
          <Form
            user={user}
            currentChannelId={currentChannelId}
            sendMessageState={sendMessageState}
            uiState={uiState}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  )
};

export default App;
