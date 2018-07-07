import React from 'react';
import connect from '../connect';

const mapStateToProps = ({
  sendMessage,
  removeMessageFromQueue,
  messagesQueue,
}) => ({
  sendMessage,
  removeMessageFromQueue,
  messagesQueue,
});

@connect(mapStateToProps)

export default class MessagesQueue extends React.Component {
  resendMessage = (message, key) => (e) => {
    e.preventDefault();
    const { sendMessage } = this.props;
    sendMessage(message, true, key);
  };

  deleteMessage = key => (e) => {
    e.preventDefault();
    const { removeMessageFromQueue } = this.props;
    removeMessageFromQueue(key);
  };

  render() {
    const { messagesQueue } = this.props;
    const keys = Object.keys(messagesQueue);
    return (
      <ul className="messages__list list-group">
        {keys.map((key) => {
          const message = {
            text: messagesQueue[key].text,
            userName: messagesQueue[key].userName,
            channelId: messagesQueue[key].channelId,
          };
          return (
            <li key={key} className="messages__item list-group-item list-group-item-danger">
              <div>
                <span className="badge badge-pill badge-danger">
                  Unsent message:
                </span>
                <span> {message.text}</span>
              </div>
              <div>
                <button
                  type="button"
                  onClick={this.resendMessage(message, key)}
                  className="btn btn-link"
                >
                  Try again
                </button>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={this.deleteMessage(key)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
