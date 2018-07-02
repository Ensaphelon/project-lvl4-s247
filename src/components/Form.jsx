import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ user, currentChannelId, sendMessageState, uiState }) => ({
  user, currentChannelId, sendMessageState, uiState,
});

@connect(mapStateToProps)

class Form extends React.Component {
  submit(values, f, { reset }) {
    const { user, sendMessage, currentChannelId } = this.props;
    sendMessage({
      text: values.message,
      userName: user.name,
    }, currentChannelId);
    reset();
  }

  render() {
    const { handleSubmit, uiState } = this.props;
    const errorMessageClass = cn({
      'alert alert-danger w-100': true,
      'd-none': uiState.errorMessageHidden,
    });
    return (
      <form className="form-inline" onSubmit={handleSubmit(this.submit.bind(this))}>
        <div className="w-100">
          <div className="input-group mb-2">
            <Field required className="form-control" name="message" component="textarea" />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
        <div className={errorMessageClass}>
          The message was not sent, the next attempt will be in 3 seconds
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'message',
})(Form);
