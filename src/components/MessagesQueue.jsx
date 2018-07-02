import React from 'react';
import connect from '../connect';

const mapStateToProps = ({
  sendMessage,
  removeMessageFromQueue,
  sendMessageState: { queue },
}) => ({
  sendMessage,
  removeMessageFromQueue,
  queue,
});

@connect(mapStateToProps)

export default class MessagesQueue extends React.Component {
  render() {
    const { queue, sendMessage, removeMessageFromQueue } = this.props;
    const keys = Object.keys(queue);
    return (
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
    );
  }
}
