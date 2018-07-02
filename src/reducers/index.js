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
  [actions.sendMessageSuccess]({ queue }, { payload }) {
    return {
      queue: payload ? { ...omit(queue, payload) } : { ...queue },
    };
  },
  [actions.sendMessageFailure]({ queue }, { payload }) {
    return {
      queue: payload ? { ...queue, [payload.id]: payload.text }
        : { ...queue },
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
  [actions.sendMessageFailure](state) {
    return { ...state, errorMessageHidden: false };
  },
  [actions.sendMessageSuccess](state) {
    return { ...state, errorMessageHidden: true };
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
  errorMessageHidden: true,
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
