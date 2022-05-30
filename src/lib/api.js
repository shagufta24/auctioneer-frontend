import { get, post } from '../config';

export const register = async body => {
  const res = await post('/register', body);
  return res;
};

export const addListing = async (
  itemName,
  subtitle,
  startingCost,
  desc,
  features,
  specs,
  images,
  maxCost
) => {
  const requestObj = {
    name: itemName,
    subtitle,
    cost: startingCost,
    desc,
    features,
    specs,
    max_cost: maxCost,
    image: images[0].data_url,
  };
  const res = await post('/listing', requestObj);
  return res;
};

export const login = async body => {
  const res = await post('/login', body);
  return res;
};

export const getAllListings = async () => {
  const res = await get('/listings');
  return res;
};

export const getListingById = async id => {
  const res = await get(`/listing?id=${id}`);
  return res;
};

export const makeBid = async (id, email, amount) => {
  const res = await post('/bid', { id, bid: { user: email, amount } });
  return res;
};

export const getUserListings = async email => {
  const res = await get(`/user/listings?email=${email}`);
  return res;
};

export const getUser = async email => {
  const res = await get(`user?email=${email}`);
  return res;
};
