import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { addMessage } from '../actions';

const submit = ({ message }, dispatch) => {
  dispatch(addMessage({ text: message }));
};

const Form = ({ handleSubmit, dispatch }) => (
  <form onSubmit={handleSubmit(submit, dispatch)}>
    <Field name="message" component="textarea" />
    <button className="btn btn-primary" type="submit">Add</button>
  </form>
);

export default reduxForm({
  form: 'message',
})(Form);
