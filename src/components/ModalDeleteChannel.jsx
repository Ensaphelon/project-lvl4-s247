import React from 'react';
import { Modal } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({
  uiState,
  channelIdForModify,
}) => ({
  uiState,
  channelIdForModify,
});

@connect(mapStateToProps)

class ModalDeleteChannel extends React.Component {
  handleDelete = () => {
    const {
      deleteChannel,
      channelIdForModify,
    } = this.props;
    deleteChannel(channelIdForModify);
  };

  handleClose = () => {
    const {
      modalToggleView,
    } = this.props;
    modalToggleView({ type: 'delete' });
  };

  render() {
    const { uiState } = this.props;
    const { modalDeleteChannelButtonDisabled } = uiState;
    return (
      <Modal
        show={uiState.modalDeleteChannelOpened}
        onHide={this.handleClose}
      >
        <Modal.Body>
          <div>
            <p>
              Are you sure you want to delete this channel?
            </p>
            <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleDelete}
                disabled={modalDeleteChannelButtonDisabled}
              >
                Delete
              </button>
              <button
                onClick={this.handleClose}
                disabled={modalDeleteChannelButtonDisabled}
                type="button"
                className="btn btn-link"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalDeleteChannel;
