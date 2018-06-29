import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { uniqueId } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, {
    payload: {
      text,
      userId,
      id,
      channelId,
    },
  }) {
    return [...state, {
      text,
      userId,
      id,
      channelId,
    }];
  },
}, []);

const addMessageState = handleActions({
  [actions.addMessageRequest]() {
    return { disabled: true };
  },
  [actions.addMessageSuccess]() {
    return { disabled: false };
  },
}, {
  disabled: false,
});

const user = handleActions({
  [actions.setUserName](state, { payload: { userName } }) {
    return { name: userName, id: uniqueId() };
  },
}, {});

const channels = handleActions({}, {});

const currentChannelId = handleActions({}, {});

export default combineReducers({
  addMessageState,
  messages,
  user,
  channels,
  currentChannelId,
  form: formReducer,
});
