import React from 'react';
import cn from 'classnames';
import Trash from 'react-icons/lib/fa/trash';
import Pencil from 'react-icons/lib/fa/pencil';
import AddChannel from './ChannelsAdd';
import connect from '../connect';

const renderControls = isActiveChannel => (
  <div>
    <a href="#!" alt="Edit">
      <Pencil
        size={18}
        color={isActiveChannel ? 'white' : 'black'}
        className="position-absolute mt-2 ml-1"
      />
    </a>
    <a href="#!" alt="Delete">
      <Trash
        size={18}
        color={isActiveChannel ? 'white' : 'black'}
        className="position-absolute mt-2 ml-4"
      />
    </a>
  </div>
);

const mapStateToProps = ({ channels, currentChannelId }) => ({
  channels,
  currentChannelId,
});

@connect(mapStateToProps)

export default class Channels extends React.Component {
  render() {
    const { channels, currentChannelId, setActiveChannel } = this.props;
    return (
      <ul className="list-group">
        {channels.list.map(({ id, name, removable }) => {
          const isActiveChannel = id === currentChannelId;
          const className = cn({
            'btn w-100 pr-5 pl-5': true,
            'btn-primary': isActiveChannel,
            'btn-light': !isActiveChannel,
          });
          return (
            <li className="list-group-item p-0 border-white mb-1" key={id}>
              {removable ? renderControls(isActiveChannel) : null }
              <button onClick={() => setActiveChannel(id)} type="button" className={className}>
                {name}
              </button>
            </li>
          );
        })}
        <li className="list-group-item p-0 border-white">
          <AddChannel />
        </li>
      </ul>
    );
  }
}
