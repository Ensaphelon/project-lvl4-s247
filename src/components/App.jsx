import React from 'react';
import Form from './Form';
import Messages from './Messages';
import Channels from './Channels';
import MessagesQueue from './MessagesQueue';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';
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
            <ModalDeleteChannel />
            <ModalRenameChannel />
          </div>
          <div className="col-xs-12 col-sm-9">
            <Messages />
            <MessagesQueue />
            <Form />
          </div>
        </div>
      </div>
    );
  }
}
