import { connect } from 'react-redux';
import Component from '../components/Messages';

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Component);
