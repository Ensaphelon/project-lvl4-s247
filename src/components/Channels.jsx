import React from 'react';
import cn from 'classnames';
import Trash from 'react-icons/lib/fa/trash';
import Pencil from 'react-icons/lib/fa/pencil';
import AddChannel from './ChannelsAdd';
import connect from '../connect';

const mapStateToProps = ({
  channels,
  currentChannelId,
  modalDeleteChannelShow,
  setChannelForModify,
}) => ({
  channels,
  currentChannelId,
  modalDeleteChannelShow,
  setChannelForModify,
});

@connect(mapStateToProps)

export default class Channels extends React.Component {
  handleClick(id, showModal, e) {
    e.preventDefault();
    const { setChannelForModify } = this.props;
    setChannelForModify(id);
    showModal();
  }

  renderControls(isActiveChannel, id) {
    const { modalDeleteChannelShow, modalRenameChannelShow } = this.props;
    return (
      <div>
        <a href="#!" alt="Edit">
          <Pencil
            size={18}
            onClick={this.handleClick.bind(this, id, modalRenameChannelShow)}
            color={isActiveChannel ? 'white' : 'black'}
            className="position-absolute mt-2 ml-1"
          />
        </a>
        <a href="#!" alt="Delete">
          <Trash
            size={18}
            onClick={this.handleClick.bind(this, id, modalDeleteChannelShow)}
            color={isActiveChannel ? 'white' : 'black'}
            className="position-absolute mt-2 ml-4"
          />
        </a>
      </div>
    );
  }

  render() {
    const { channels, currentChannelId, setActiveChannel } = this.props;
    return (
      <div>
        <ul className="list-group">
          {channels.map(({ id, name, removable }) => {
            const isActiveChannel = id === currentChannelId;
            const className = cn({
              'btn w-100 pr-5 pl-5': true,
              'btn-primary': isActiveChannel,
              'btn-light': !isActiveChannel,
            });
            return (
              <li className="list-group-item p-0 border-white mb-1" key={id}>
                {removable ? this.renderControls(isActiveChannel, id) : null}
                <button onClick={setActiveChannel.bind(this, id)} type="button" className={className}>
                  {name}
                </button>
              </li>
            );
          })}
          <li className="list-group-item p-0 border-white">
            <AddChannel />
          </li>
        </ul>
      </div>
    );
  }
}
