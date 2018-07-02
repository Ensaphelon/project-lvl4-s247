import React from 'react';
import connect from '../connect';
import {removeMessageFromQueue} from "../actions";

const mapStateToProps = ({
  sendMessageState: { queue },
  messages,
  currentChannelId,
  sendMessage,
  removeMessageFromQueue,
}) => ({
  queue,
  messages,
  currentChannelId,
  sendMessage,
  removeMessageFromQueue,
});

@connect(mapStateToProps)

class Messages extends React.Component {
  render() {
    const {
      queue,
      messages,
      currentChannelId,
      sendMessage,
      removeMessageFromQueue,
    } = this.props;
    const keys = Object.keys(queue);
    return (
      <div className="messages">
        <ul className="messages__list list-group">
          {messages.filter(message => (message.channelId === currentChannelId)).map(message => (
            <li key={message.id} className="messages__item list-group-item">
              <span className="badge badge-pill badge-light">
                {message.userName}
                said:
              </span>
              <span>
                {message.text}
              </span>
            </li>
          ))}
        </ul>
        <ul className="messages__list list-group">
          {keys.map((key) => {
            const message = {
              text: queue[key].text,
              userName: queue[key].userName,
              channelId: queue[key].channelId,
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
                    onClick={() => sendMessage(message, true, key)}
                    className="btn btn-link"
                  >
                    Try again
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => removeMessageFromQueue(key)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Messages;
