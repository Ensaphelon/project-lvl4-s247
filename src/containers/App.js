import { connect } from 'react-redux';
import Component from '../components/App';
import * as actionCreators from '../actions';

const mapStateToProps = state => state;

export default connect(mapStateToProps, actionCreators)(Component);
