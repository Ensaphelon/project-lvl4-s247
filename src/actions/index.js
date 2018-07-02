import { createAction } from 'redux-actions';
import axios from 'axios';
import { addMessageUrl, addChannelUrl } from '../routes';

export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const removeMessageFromQueue = createAction('MESSAGE_OVE_FROM_QUEUE');

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
export const setActiveChannel = createAction('CHANNEL_SET_ACTIVE');
export const toggleAddChannelForm = createAction('CHANNEL_ADD_FORM_TOGGLE');
export const setFieldErrorState = createAction('CHANNEL_ADD_FORM_SET_ERROR_STATE');
export const setFieldDefaultState = createAction('CHANNEL_ADD_FORM_SET_DEFAULT_STATE');
export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const addChannel = createAction('ADD_CHANNEL');
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
