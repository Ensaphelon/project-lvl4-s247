import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { uniqueId, omit } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload }) {
    return { list: [...state.list, payload] };
  },
}, {});

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload }) {
    return payload;
  },
}, {});

const messages = handleActions({
  [actions.addMessage](state, {
    payload: {
      text,
      userName,
      id,
      channelId,
    },
  }) {
    return [...state, {
      text,
      userName,
      id,
      channelId,
    }];
  },
}, []);

const sendMessageState = handleActions({
  [actions.removeMessageFromQueue](state, { payload }) {
    return {
      queue: payload ? { ...omit(state.queue, payload) } : { ...state.queue },
    };
  },
  [actions.sendMessageFailure](state, { payload }) {
    const message = {
      text: payload.text,
      userName: payload.userName,
      channelId: payload.channelId,
    };
    return {
      queue: payload ? {
        ...state.queue, [uniqueId()]: message,
      } : { ...state.queue },
    };
  },
}, {
  queue: {},
});

const user = handleActions({
  [actions.setUserName](state, { payload: { userName } }) {
    return { name: userName, id: uniqueId() };
  },
}, {});

const uiState = handleActions({
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
  [actions.createChannelSuccess](state) {
    return {
      ...state,
      createChannelButtonDisabled: false,
      addChannelFormHidden: true,
    };
  },
}, {
  addChannelFormHidden: true,
  addChannelFormHasError: false,
  createChannelButtonDisabled: false,
});

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  sendMessageState,
  user,
  uiState,
  form: formReducer,
});
