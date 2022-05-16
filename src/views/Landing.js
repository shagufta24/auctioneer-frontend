import {
  Box,
  Center,
  HStack,
  list,
  Skeleton,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllListings } from '../lib/api';

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const listingCall = async () => {
      try {
        const res = await getAllListings();
        console.log('LISTINGS', res);
        setListings(res.data.listings);
      } catch (e) {
        setErrorMsg(
          e.response.data.msg || 'An error occured, please try again!'
        );
      } finally {
        setLoading(false);
      }
    };
    listingCall();
  }, []);

  return (
    <Box>
      {listings.length > 0 ? (
        <HStack wrap="wrap" justifyContent="space-around">
          {listings.map(listing => (
            <ProductCard {...listing} key={listing._id} />
          ))}
        </HStack>
      ) : (
        <Center h="30vw">
          <Spinner size={'xl'} />
        </Center>
      )}
    </Box>
  );
}
