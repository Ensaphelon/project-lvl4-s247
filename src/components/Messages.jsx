import React from 'react';
import * as actions from '../actions';

const Messages = ({ queue, messages, currentChannelId }) => {
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
        {keys.map(key => (
          <li key={key} className="messages__item list-group-item list-group-item-warning">
            <span className="badge badge-pill badge-warning">Unsent message:</span>
            <span> {queue[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
