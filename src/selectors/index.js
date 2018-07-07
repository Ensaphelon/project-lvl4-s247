import { createSelector } from 'reselect';
import { pickBy } from 'lodash';

export const getCurrentChannel = state => state.currentChannelId;

export const getMessages = state => pickBy(state.messages, message => (
  message.channelId === getCurrentChannel(state)
));

export const getChannels = state => state.channels;

export const messagesSelector = createSelector(
  getMessages,
  messages => Object.values(messages),
);

export const channelsSelector = createSelector(
  getChannels,
  channels => Object.values(channels),
);
