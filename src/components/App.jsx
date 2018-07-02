import React from 'react';
import Messages from './Messages';
import Channels from './Channels';
import MessagesQueue from './MessagesQueue';
import Form from './Form';
import connect from '../connect';

const mapStateToProps = state => state;

@connect(mapStateToProps)

export default class App extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="app__user-name mb-1">
          <span className="badge badge-light">
            Current user: {user.name}
          </span>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <Channels />
          </div>
          <div className="col-xs-12 col-sm-9">
            <Messages />
            <MessagesQueue />
          </div>
          <div className="col-xs-12 col-sm-12 pt-3 pb-3">
            <Form />
          </div>
        </div>
      </div>
    );
  }
}
