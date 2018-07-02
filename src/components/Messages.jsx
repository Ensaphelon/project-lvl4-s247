import React from 'react';
import connect from '../connect';

const mapStateToProps = ({
  messages,
  currentChannelId,
}) => ({
  messages,
  currentChannelId,
});

@connect(mapStateToProps)

class Messages extends React.Component {
  render() {
    const {
      messages,
      currentChannelId,
    } = this.props;
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
      </div>
    );
  }
}

export default Messages;
