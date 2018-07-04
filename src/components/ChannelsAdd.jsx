import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import { find } from 'lodash';
import connect from '../connect';

const mapStateToProps = ({ channels, uiState }) => ({ channels, uiState });

@connect(mapStateToProps)
@reduxForm(({
  form: 'newChannel',
}))
export default class ChannelsAdd extends React.Component {
  handleToggle(e) {
    e.preventDefault();
    const { toggleAddChannelForm } = this.props;
    toggleAddChannelForm();
  }

  changeHandler({ target: { value } }) {
    const { channels, setFieldErrorState, setFieldDefaultState } = this.props;
    const containsInChannelsList = find(channels, channel => channel.name === value);
    return containsInChannelsList ? setFieldErrorState() : setFieldDefaultState();
  }

  submit({ channelName }, f, { reset }) {
    const { createChannel, addChannelFormHasError } = this.props;
    if (!addChannelFormHasError && channelName) {
      createChannel(channelName, reset);
    }
  }

  render() {
    const {
      uiState: {
        addChannelFormHidden,
        addChannelFormHasError,
        createChannelButtonDisabled,
      },
      handleSubmit,
    } = this.props;
    const addNewButtonClassName = cn({
      'btn w-100 btn-link': true,
      'd-none': !addChannelFormHidden,
    });
    const formClassName = cn({
      'form-inline': true,
      'd-none': addChannelFormHidden,
    });
    const fieldClassName = cn({
      'text-center mb-2 form-control w-100': true,
      'is-invalid': addChannelFormHasError,
    });
    return (
      <div>
        <button
          onClick={this.handleToggle.bind(this)}
          type="button"
          className={addNewButtonClassName}
        >
          Add new
        </button>
        <form onSubmit={handleSubmit(this.submit.bind(this))} className={formClassName}>
          <Field
            className={fieldClassName}
            name="channelName"
            component="input"
            type="text"
            onChange={this.changeHandler.bind(this)}
          />
          <button type="button" onClick={this.handleToggle.bind(this)} className="btn btn-link">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={createChannelButtonDisabled}>
            Add
          </button>
        </form>
      </div>
    );
  }
}
