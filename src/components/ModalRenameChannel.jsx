import React from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({
  uiState,
  renameChannel,
  channelIdForModify,
}) => ({
  uiState,
  renameChannel,
  channelIdForModify,
});

@connect(mapStateToProps)
@reduxForm(({
  form: 'renameChannel',
}))
export default class ModalRenameChannel extends React.Component {
  submit = ({ channelName }) => {
    const {
      renameChannel,
      reset,
      channelIdForModify,
    } = this.props;
    return renameChannel(channelName, channelIdForModify)
      .then(reset);
  };

  handleClose = () => {
    const {
      modalToggleView,
    } = this.props;
    modalToggleView({ type: 'rename' });
  };

  render() {
    const {
      uiState,
      handleSubmit,
      submitting,
    } = this.props;
    return (
      <Modal
        show={uiState.modalRenameChannelOpened}
        onHide={this.handleClose}
      >
        <Modal.Body>
          <p>
            Enter the new channel name
          </p>
          <form className="form-inline mt-3" onSubmit={handleSubmit(this.submit)}>
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
                  onClick={this.handleClose}
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
}
