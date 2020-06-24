import axios from 'axios';

export default axios.create({
  baseURL: 'https://todos-be.herokuapp.com/api/',
  headers: {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  },
});
