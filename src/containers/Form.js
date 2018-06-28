import { connect } from 'react-redux';
import Component from '../components/Form';

const mapStateToProps = ({ channels }) => ({ channels });

export default connect(mapStateToProps)(Component);
