import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

const { get, put, post, destroy } = api;

export { get, put, post, destroy };
