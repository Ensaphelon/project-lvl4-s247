import React from 'react';
import * as actions from '../actions';

const Messages = ({ messages, user }) => {
  return (
    <div className="messages">
    	<ul className="messages__list list-group">
    		{messages.map((message) => {
    			return <li key={message.id} className="messages__item w-75 list-group-item">{message.text}</li>
    		})}
    	</ul>
    </div>
  );
};

export default Messages;