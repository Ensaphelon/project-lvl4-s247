import React from 'react';
import cn from 'classnames';
import isArray from 'lodash';

const renderChannelItem = (className, id, name) => (
  <li className={className} key={id}>{name}</li>
);

const Channels = ({channels: { list }, currentChannelId}) => {
  if (!isArray(list) && list.length === 0) {
    return null;
  }
  return (
    <ul className="list-group">
      {list.map(({ id, name }) => {
        const className = cn({
          'list-group-item list-group-item-action': true,
          active: id === currentChannelId,
        });
        return renderChannelItem(className, id, name);
      })}
    </ul>
  );
};

export default Channels;
