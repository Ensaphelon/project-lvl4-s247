import { createAction } from 'redux-actions';
import axios from 'axios';
import { addMessageUrl, addChannelUrl, deleteChannelUrl } from '../routes';

export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');
export const removeMessageFromQueue = createAction('MESSAGE_REMOVE_FROM_QUEUE');

export const sendMessage = (message, isResend, key) => (dispatch) => {
  const { text, userName, channelId } = message;
  const url = addMessageUrl(message.channelId);
  const sendData = { data: { attributes: { text, userName } } };
  return new Promise((resolve, reject) => {
    axios.post(url, sendData)
      .then(() => {
        if (isResend) {
          dispatch(removeMessageFromQueue(key));
        }
        resolve();
      })
      .catch(() => {
        if (!isResend) {
          dispatch(sendMessageFailure({
            text,
            userName,
            channelId,
          }));
        }
        reject();
      });
  });
};

export const addMessage = createAction('MESSAGE_ADD');

export const setUserName = createAction('USERNAME_SET');

// CHANNELS
export const addChannel = createAction('CHANNEL_ADD');
export const setActiveChannel = createAction('CHANNEL_SET_ACTIVE');
export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const toggleAddChannelForm = createAction('CHANNEL_ADD_FORM_TOGGLE');
export const setFieldErrorState = createAction('CHANNEL_ADD_FORM_SET_ERROR_STATE');
export const setFieldDefaultState = createAction('CHANNEL_ADD_FORM_SET_DEFAULT_STATE');

export const createChannel = name => async (dispatch) => {
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
    console.warn(e); // eslint-disable-line no-console
    dispatch(createChannelFailure());
  }
};

export const deleteChannel = id => async (dispatch) => {
  try {
    await axios.delete(deleteChannelUrl(id), { data: { id } });
    dispatch(deleteChannelSuccess(id));
  } catch (e) {
    console.warn(e); // eslint-disable-line no-console
  }
};
