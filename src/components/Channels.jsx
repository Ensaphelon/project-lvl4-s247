import React from 'react';

export default class Channels extends React.Component{
  render(){
    const { channels } = this.props;
    if (channels.length){
      return <ul className="list-group">
        {channels.map((channel, index) => {
          return <li className='list-group-item list-group-item-action' key={index}>{channel.name}</li>
        })}
      </ul>
    }
    return null;
  }
};