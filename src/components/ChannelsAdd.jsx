import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import { find } from 'lodash';
import connect from '../connect';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { uiState } = state;
  return { uiState, channels: channelsSelector(state) };
};

@connect(mapStateToProps)
@reduxForm(({
  form: 'newChannel',
}))

export default class ChannelsAdd extends React.Component {
  changeHandler = ({ target: { value } }) => {
    const { channels, setFieldErrorState, setFieldDefaultState } = this.props;
    const containsInChannelsList = find(channels, channel => channel.name === value);
    return containsInChannelsList ? setFieldErrorState() : setFieldDefaultState();
  };

  submit = ({ channelName }, f, { reset }) => {
    const { createChannel, uiState } = this.props;
    if (!uiState.addChannelFormHasError && channelName) {
      createChannel(channelName, reset);
    }
  };

  render() {
    const {
      uiState: {
        addChannelFormHidden,
        addChannelFormHasError,
        createChannelButtonDisabled,
      },
      toggleAddChannelForm,
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
          onClick={toggleAddChannelForm}
          type="button"
          className={addNewButtonClassName}
        >
          Add new
        </button>
        <form onSubmit={handleSubmit(this.submit)} className={formClassName}>
          <Field
            className={fieldClassName}
            name="channelName"
            component="input"
            type="text"
            onChange={this.changeHandler}
          />
          <button type="button" onClick={toggleAddChannelForm} className="btn btn-link">
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
