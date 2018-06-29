import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';

const Form = ({
  user,
  handleSubmit,
  dispatch,
  sendMessage,
  currentChannelId,
  addMessageState,
}) => {
  const submit = (values, f, { reset }) => {
    sendMessage({
      text: values.message,
      userId: user.id,
    }, currentChannelId);
    reset();
  };
  const { disabled } = addMessageState;
  const buttonClass = cn({
    'btn btn-primary': true,
    'disabled': disabled
  });
  return (
    <form className="form-inline" onSubmit={handleSubmit(submit)}>
      <div className="w-100">
        <div className="input-group mb-12">
          <Field className="form-control" name="message" component="textarea" />
          <button className={buttonClass} disabled={disabled} type="submit">Send</button>
        </div>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'message',
})(Form);
