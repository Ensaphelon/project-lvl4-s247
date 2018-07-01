import { connect } from 'react-redux';
import Component from '../components/Messages';

const mapStateToProps = ({ sendMessageState: { queue }, messages, currentChannelId }) => ({
  queue,
  messages,
  currentChannelId,
});

export default connect(mapStateToProps)(Component);
