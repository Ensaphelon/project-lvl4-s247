import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { uniqueId } from 'lodash';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, { payload: { text } }) {
    return { ...state, [uniqueId()]: text };
  },
}, {});

const user = handleActions({
  [actions.setUserName](state, { payload: { userName } }) {
    return { ...state, name: userName, id: uniqueId() };
  },
}, {});

export default combineReducers({
  messages,
  user,
  form: formReducer,
});
