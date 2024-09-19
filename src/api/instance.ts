import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1',
  headers: {
    accept: 'application/json'
  }
});

export default instance;
