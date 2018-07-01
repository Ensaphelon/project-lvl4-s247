import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';

const Form = ({
  user,
  handleSubmit,
  sendMessage,
  currentChannelId,
  uiState,
}) => {
  const submit = (values, f, { reset }) => {
    sendMessage({
      text: values.message,
      userName: user.name,
    }, currentChannelId);
    reset();
  };
  const errorMessageClass = cn({
    'alert alert-danger w-100': true,
    'd-none': uiState.errorMessageHidden,
  });
  return (
    <form className="form-inline" onSubmit={handleSubmit(submit)}>
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
};

export default reduxForm({
  form: 'message',
})(Form);
