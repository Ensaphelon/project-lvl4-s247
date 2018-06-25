import React from 'react';
import Channels from './Channels.jsx';

const App = ({ data }) => (
  <div className="row">
    <div className="col-xs-12 col-sm-3">
      <div className="app__user-name mb-1">
        {data.userName}
      </div>
      <Channels channels={data.channels} />
    </div>
  </div>
);

export default App;
