import { connect } from 'react-redux';
import Component from '../components/Messages';
import axios from 'axios';

axios.get('http://localhost:8081/channels/1/messages')
  .then((response) => {
    console.log(response.data);
  }).catch((err) => {
    console.log(err);
});

const mapStateToProps = (state) => {
  // console.log(getMessages());
};

export default connect(mapStateToProps)(Component);
