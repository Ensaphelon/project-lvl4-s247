import React from 'react';
import MessagesContainer from '../containers/Messages';
import ChannelsContainer from '../containers/Channels';
import FormContainer from '../containers/Form';

const App = ({ user }) => (
  <div>
    <div className="app__user-name mb-1">
      <span className="badge badge-light">
        Current user: {user.name}
      </span>
    </div>
    <div className="row">
      <div className="col-xs-12 col-sm-3">
        <ChannelsContainer />
      </div>
      <div className="col-xs-12 col-sm-9">
        <MessagesContainer />
      </div>
      <div className="col-xs-12 col-sm-12 pt-3 pb-3">
        <FormContainer />
      </div>
    </div>
  </div>
);

export default App;
