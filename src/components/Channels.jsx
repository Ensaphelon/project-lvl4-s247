import React from 'react';
import cn from 'classnames';
import isArray from 'lodash';


const Channels = ({ channels: { list }, currentChannelId, setActiveChannel }) => {
  if (!isArray(list) && list.length === 0) {
    return null;
  }
  return (
    <ul className="list-group">
      {list.map(({ id, name }) => {
        const isActiveChannel = id === currentChannelId;
        const className = cn({
          'btn w-100': true,
          'btn-primary': isActiveChannel,
          'btn-light': !isActiveChannel,
        });
        return (
          <li className="list-group-item p-0 border-white" key={id}>
            <button onClick={() => setActiveChannel(id)} type="button" className={className}>{name}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
