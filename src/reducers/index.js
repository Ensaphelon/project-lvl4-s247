import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { uniqueId, mapValues, omit } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.deleteChannelSuccess](state, { payload }) {
    return omit(state, payload);
  },
  [actions.renameChannelSuccess](state, { payload: { name, channelId } }) {
    return mapValues(state, channel => (
      channel.id !== channelId ? channel : {
        ...channel,
        name,
      }
    ));
  },
}, {});

const channelIdForModify = handleActions({
  [actions.setChannelForModify](state, { payload }) {
    return payload;
  },
}, null);

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload }) {
    return payload;
  },
  [actions.deleteChannelSuccess](state, { payload }) {
    return payload === state ? 1 : state;
  },
}, {});

const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    return { ...state, [payload.id]: payload };
  },
  [actions.deleteChannelSuccess](state, { payload }) {
    return omit(state, payload);
  },
}, {});

const messagesQueue = handleActions({
  [actions.removeMessageFromQueue](state, { payload }) {
    return payload ? { ...omit(state, payload) } : { ...state };
  },
  [actions.sendMessageFailure](state, { payload }) {
    const message = {
      text: payload.text,
      userName: payload.userName,
      channelId: payload.channelId,
    };
    return payload ? {
      ...state, [uniqueId()]: message,
    } : { ...state };
  },
}, []);

const user = handleActions({
  [actions.setUserName](state, { payload: { userName } }) {
    return { name: userName, id: uniqueId() };
  },
}, {});

const uiState = handleActions({
  [actions.modalToggleView](state, { payload }) {
    return { ...state, modalType: payload };
  },
  [actions.renameChannelSuccess](state) {
    return { ...state, modalType: null };
  },
  [actions.setFieldErrorState](state) {
    return { ...state, addChannelFormHasError: true };
  },
  [actions.setFieldDefaultState](state) {
    return { ...state, addChannelFormHasError: false };
  },
  [actions.toggleAddChannelForm](state) {
    return { ...state, addChannelFormHidden: !state.addChannelFormHidden };
  },
  [actions.createChannelRequest](state) {
    return { ...state, createChannelButtonDisabled: true };
  },
  [actions.createChannelFailure](state) {
    return { ...state, createChannelButtonDisabled: false };
  },
  [actions.deleteChannelRequest](state) {
    return { ...state, modalDeleteChannelButtonDisabled: true };
  },
  [actions.deleteChannelFailure](state) {
    return { ...state, modalDeleteChannelButtonDisabled: false };
  },
  [actions.createChannelSuccess](state) {
    return {
      ...state,
      createChannelButtonDisabled: false,
      addChannelFormHidden: true,
    };
  },
  [actions.deleteChannelSuccess](state) {
    return {
      ...state,
      modalType: null,
      modalDeleteChannelButtonDisabled: false,
    };
  },
}, {
  modalDeleteChannelButtonDisabled: false,
  addChannelFormHidden: true,
  addChannelFormHasError: false,
  createChannelButtonDisabled: false,
});

export default combineReducers({
  channels,
  currentChannelId,
  channelIdForModify,
  messages,
  messagesQueue,
  user,
  uiState,
  form: formReducer,
});
