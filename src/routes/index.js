const root = '/api/v1/';

export const addChannelUrl = () => `${root}channels/`;
export const deleteChannelUrl = id => `${root}channels/${id}`;
export const addMessageUrl = channelId => `${root}channels/${channelId}/messages`;
