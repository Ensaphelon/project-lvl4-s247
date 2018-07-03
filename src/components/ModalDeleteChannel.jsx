import React from 'react';
import { Modal } from 'react-bootstrap';
import connect from '../connect';

const mapStateToProps = ({
  uiState,
  channels,
}) => ({
  uiState,
  channels,
});

@connect(mapStateToProps)

class ModalDeleteChannel extends React.Component {
  async handleDelete(id) {
    const {
      deleteChannel,
    } = this.props;
    await deleteChannel(id);
  }

  render() {
    const {
      uiState,
      modalDeleteChannelHide,
      channels: { channelIdForModify },
    } = this.props;
    return (
      <Modal
        show={uiState.modalDeleteChannelOpened}
        onHide={modalDeleteChannelHide}
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
                onClick={() => this.handleDelete(channelIdForModify)}
                disabled={uiState.modalDeleteChannelButtonDisabled}
              >
                Delete
              </button>
              <button
                onClick={modalDeleteChannelHide}
                disabled={uiState.modalDeleteChannelButtonDisabled}
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
};

export default ModalDeleteChannel;
