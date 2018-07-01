import { connect } from 'react-redux';
import Component from '../components/Form';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const {
    user, currentChannelId, sendMessageState, uiState,
  } = state;
  return {
    user, currentChannelId, sendMessageState, uiState,
  };
};

export default connect(mapStateToProps, actionCreators)(Component);
