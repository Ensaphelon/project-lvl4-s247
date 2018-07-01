import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { uniqueId, omit } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({}, {});

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
  [actions.sendMessageFailure]() {
    return { errorMessageHidden: false };
  },
  [actions.sendMessageSuccess]() {
    return { errorMessageHidden: true };
  },
}, {
  errorMessageHidden: true,
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
