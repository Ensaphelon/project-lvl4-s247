import { connect } from 'react-redux';
import Component from '../components/Form';

const mapStateToProps = ({ user }) => user;

export default connect(mapStateToProps)(Component);
