import { createAction } from 'redux-actions';
import axios from 'axios';
import { uniqueId } from 'lodash';
import addMessageUrl from '../routes';

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
      dispatch(sendMessageFailure(isRepeat ? null : { id, text }));
    }
  };
  send(sendData);
};

export const addMessage = createAction('MESSAGE_ADD');

export const setUserName = createAction('USERNAME_SET');
