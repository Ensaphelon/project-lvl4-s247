import { createAction } from 'redux-actions';
import axios from 'axios';
import { uniqueId } from 'lodash';
import { addMessageUrl, addChannelUrl } from '../routes';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = ({ text, userName }, channelId) => (dispatch) => {
  const url = addMessageUrl(channelId);
  const id = uniqueId();
  const sendData = {
    data: {
      attributes: { text, userName },
    },
  };
  const send = async (data, isRepeat) => {
    try {
      await axios.post(url, data);
      dispatch(sendMessageSuccess(isRepeat ? id : null));
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
      setTimeout(() => {
        send(data, true);
      }, 3000);
      dispatch(sendMessageFailure(isRepeat ? null : { id, text, channelId }));
    }
  };
  send(sendData);
};

export const addMessage = createAction('MESSAGE_ADD');

export const setUserName = createAction('USERNAME_SET');


// CHANNELS
export const setActiveChannel = createAction('CHANNEL_SET_ACTIVE');
export const toggleAddChannelForm = createAction('CHANNEL_ADD_FORM_TOGGLE');
export const setFieldErrorState = createAction('CHANNEL_ADD_FORM_SET_ERROR_STATE');
export const setFieldDefaultState = createAction('CHANNEL_ADD_FORM_SET_DEFAULT_STATE');
export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const addChannel = createAction('ADD_CHANNEL');
export const createChannel = (name) => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    const sendData = {
      data: {
        attributes: { name },
      },
    };
    await axios.post(addChannelUrl(), sendData);
    dispatch(createChannelSuccess());
  } catch (e) {
    console.warn(e);  // eslint-disable-line no-console
    dispatch(createChannelFailure());
  }
};
