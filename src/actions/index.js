import { createAction } from 'redux-actions';
import axios from 'axios';
import addMessageUrl from '../routes';

// MESSAGE SEND STATE
export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = ({ text, userId }, channelId) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const sendData = {
      data: {
        attributes: { text, userId },
      },
    };
    await axios.post(addMessageUrl(channelId), sendData);
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};

// MESSAGES

export const addMessage = createAction('MESSAGE_ADD');

// USER
export const setUserName = createAction('USERNAME_SET');
