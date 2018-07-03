import React from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({
  uiState,
  channels,
  renameChannel,
}) => ({
  uiState,
  channels,
  renameChannel,
});

@connect(mapStateToProps)
class ModalRenameChannel extends React.Component {
  submit({ channelName }) {
    const {
      renameChannel,
      reset,
      channels,
    } = this.props;
    return renameChannel(channelName, channels.channelIdForModify)
      .then(reset);
  }

  render() {
    const {
      uiState,
      modalRenameChannelHide,
      handleSubmit,
      submitting,
    } = this.props;
    return (
      <Modal
        show={uiState.modalRenameChannelOpened}
        onHide={modalRenameChannelHide}
      >
        <Modal.Body>
          <p>
            Enter the new channel name
          </p>
          <form className="form-inline mt-3" onSubmit={handleSubmit(this.submit.bind(this))}>
            <div className="w-100">
              <div className="input-group mb-2">
                <Field
                  disabled={submitting}
                  required
                  className="form-control"
                  name="channelName"
                  component="input"
                />
                <button
                  disabled={submitting}
                  className="btn btn-primary"
                  type="submit"
                >
                  Rename
                </button>
                <button
                  onClick={modalRenameChannelHide}
                  disabled={submitting}
                  className="btn btn-link"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
};

export default reduxForm({
  form: 'renameChannel',
})(ModalRenameChannel);
