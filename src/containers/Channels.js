import { connect } from 'react-redux';
import Component from '../components/Channels';
import * as actionCreators from '../actions';

const mapStateToProps = ({ channels, currentChannelId }) => ({
  channels,
  currentChannelId,
});

export default connect(mapStateToProps, actionCreators)(Component);
