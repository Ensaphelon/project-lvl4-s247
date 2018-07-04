import { createAction } from 'redux-actions';
import axios from 'axios';
import { addMessageUrl, addChannelUrl, modifyChannelUrl } from '../routes';

export const modalDeleteChannelShow = createAction('MODAL_DELETE_CHANNEL_SHOW');
export const modalDeleteChannelHide = createAction('MODAL_DELETE_CHANNEL_HIDE');
export const modalRenameChannelShow = createAction('MODAL_RENAME_CHANNEL_SHOW');
export const modalRenameChannelHide = createAction('MODAL_RENAME_CHANNEL_HIDE');

export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');
export const removeMessageFromQueue = createAction('MESSAGE_REMOVE_FROM_QUEUE');
export const addMessage = createAction('MESSAGE_ADD');

export const setUserName = createAction('USERNAME_SET');

export const addChannel = createAction('CHANNEL_ADD');
export const setActiveChannel = createAction('CHANNEL_SET_ACTIVE');
export const setChannelForModify = createAction('CHANNEL_SET_MODIFY');
export const createChannelRequest = createAction('CHANNEL_CREATE_REQUEST');
export const createChannelFailure = createAction('CHANNEL_CREATE_FAILURE');
export const createChannelSuccess = createAction('CHANNEL_CREATE_SUCCESS');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const toggleAddChannelForm = createAction('CHANNEL_ADD_FORM_TOGGLE');
export const setFieldErrorState = createAction('CHANNEL_ADD_FORM_SET_ERROR_STATE');
export const setFieldDefaultState = createAction('CHANNEL_ADD_FORM_SET_DEFAULT_STATE');

export const createChannel = (name, resetForm) => async (dispatch) => {
  dispatch(createChannelRequest());
  try {
    const sendData = {
      data: {
        attributes: { name },
      },
    };
    await axios.post(addChannelUrl(), sendData);
    dispatch(createChannelSuccess());
    resetForm();
  } catch (e) {
    console.warn(e); // eslint-disable-line no-console
    dispatch(createChannelFailure());
  }
};

export const deleteChannel = id => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    await axios.delete(modifyChannelUrl(id), { data: { channelIdForModify: { id } } });
    dispatch(deleteChannelSuccess(id));
  } catch (e) {
    console.warn(e); // eslint-disable-line no-console
    dispatch(deleteChannelFailure(id));
  }
};

export const renameChannel = (name, channelId) => (dispatch) => {
  const url = modifyChannelUrl(channelId);
  const sendData = { data: { attributes: { name } } };
  return axios.patch(url, sendData)
    .then(() => {
      dispatch(renameChannelSuccess({ name, channelId }));
    });
};

export const sendMessage = (message, isResend, key) => (dispatch) => {
  const { text, userName, channelId } = message;
  const url = addMessageUrl(message.channelId);
  const sendData = { data: { attributes: { text, userName } } };
  return axios.post(url, sendData)
    .then(() => {
      if (isResend) {
        dispatch(removeMessageFromQueue(key));
      }
    })
    .catch(() => {
      if (!isResend) {
        dispatch(sendMessageFailure({
          text,
          userName,
          channelId,
        }));
      }
    });
};
