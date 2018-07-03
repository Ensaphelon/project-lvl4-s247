import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ user, currentChannelId, sendMessageState }) => ({
  user, currentChannelId, sendMessageState,
});

@connect(mapStateToProps)
@reduxForm(({
  form: 'message',
}))
export default class Form extends React.Component {
  submit = (values) => {
    const {
      user,
      sendMessage,
      currentChannelId,
      reset,
    } = this.props;
    const message = {
      text: values.message,
      userName: user.name,
      channelId: currentChannelId,
    };
    return sendMessage(message)
      .finally(reset);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className="form-inline mt-3" onSubmit={handleSubmit(this.submit)}>
        <div className="w-100">
          <div className="input-group mb-2">
            <Field disabled={submitting} required className="form-control" name="message" component="textarea" />
            <button disabled={submitting} className="btn btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}
