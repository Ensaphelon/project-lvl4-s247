import React from 'react';

const Channels = ({ channels }) => {
  if (channels.length) {
    return (
      <ul className="list-group">
        {channels.map(channel => (
          <li className="list-group-item list-group-item-action" key={channel.id}>
            {channel.name}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

export default Channels;
