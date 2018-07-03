import React from 'react';
import cn from 'classnames';
import Trash from 'react-icons/lib/fa/trash';
import Pencil from 'react-icons/lib/fa/pencil';
import { Modal, Header } from 'react-bootstrap';
import AddChannel from './ChannelsAdd';
import ChannelsDeleteForm from './ChannelsDeleteForm';
import ChannelsRenameForm from './ChannelsRenameForm';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId, deleteChannel }) => ({
  channels,
  currentChannelId,
  deleteChannel,
});

@connect(mapStateToProps)

export default class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        delete: false,
        rename: false,
        show: false,
      },
      selectedChannel: null,
    };
  }

  handleClose() {
    this.setState({ modal: { show: false } });
  }

  showModal(id, type) {
    this.setState({
      modal: {
        show: true,
        [type]: true,
      },
      selectedChannel: id,
    });
  }

  async handleDelete() {
    const { selectedChannel } = this.state;
    const { currentChannelId, deleteChannel } = this.props;
    await deleteChannel(selectedChannel);
    this.setState({
      modal: {
        show: false,
      },
      selectedChannel: currentChannelId === selectedChannel ? 1 : selectedChannel,
    });
  }

  renderControls(isActiveChannel, id) {
    return (
      <div>
        <a href="#!" alt="Edit">
          <Pencil
            size={18}
            onClick={this.showModal.bind(this, id, 'rename')}
            color={isActiveChannel ? 'white' : 'black'}
            className="position-absolute mt-2 ml-1"
          />
        </a>
        <a href="#!" alt="Delete">
          <Trash
            size={18}
            onClick={this.showModal.bind(this, id, 'delete')}
            color={isActiveChannel ? 'white' : 'black'}
            className="position-absolute mt-2 ml-4"
          />
        </a>
      </div>
    );
  }

  render() {
    const { channels, currentChannelId, setActiveChannel } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <Modal show={modal.show} onHide={this.handleClose.bind(this)}>
          <Modal.Body>
            <ChannelsDeleteForm
              handleDelete={this.handleDelete.bind(this)}
              handleClose={this.handleClose.bind(this)}
              visible={this.state.modal.delete}
            />
            <ChannelsRenameForm
              handleClose={this.handleClose.bind(this)}
              visible={this.state.modal.rename}
            />
          </Modal.Body>
        </Modal>
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
                {removable ? this.renderControls(isActiveChannel, id) : null }
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
      </div>
    );
  }
}
