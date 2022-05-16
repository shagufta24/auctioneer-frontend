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
