import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import { find } from 'lodash';
import connect from '../connect';

const mapStateToProps = ({ channels, uiState }) => ({ channels, uiState });

@connect(mapStateToProps)

class ChannelsAdd extends React.Component {
  render() {
    const { channels: { list } } = this.props;
    const {
      uiState,
      createChannel,
      handleSubmit,
      toggleAddChannelForm,
      setFieldErrorState,
      setFieldDefaultState,
    } = this.props;
    const {
      addChannelFormHidden,
      addChannelFormHasError,
      createChannelButtonDisabled,
    } = uiState;

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
    const submit = ({ channelName }, f, { reset }) => {
      if (!addChannelFormHasError && channelName) {
        createChannel(channelName);
      }
      reset();
    };
    const changeHandler = ({ target: { value } }) => {
      const containsInChannelsList = find(list, channel => channel.name === value);
      return containsInChannelsList ? setFieldErrorState() : setFieldDefaultState();
    };
    return (
      <div>
        <button
          onClick={toggleAddChannelForm}
          type="button"
          className={addNewButtonClassName}
        >
          Add new
        </button>
        <form onSubmit={handleSubmit(submit)} className={formClassName}>
          <Field
            className={fieldClassName}
            name="channelName"
            component="input"
            type="text"
            onChange={changeHandler}
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

export default reduxForm({
  form: 'newChannel',
})(ChannelsAdd);
