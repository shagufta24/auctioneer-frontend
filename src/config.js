import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development'
      ? 'https://auctioneer-server.herokuapp.com'
      : 'http://localhost:5000',
});

const { get, put, post, destroy } = api;

export { get, put, post, destroy };
