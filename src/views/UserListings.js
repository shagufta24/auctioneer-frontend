import { Box, Center, HStack, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import useLocalStorage from '../hooks/useLocalStorage';
import { getUserListings } from '../lib/api';

export default function UserListings() {
  const [email, _] = useLocalStorage('email', null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const data = await getUserListings(email);
      setListings(data.data.listings);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <Box>
      {!loading ? (
        <HStack wrap="wrap" justifyContent="space-around">
          {listings.map(listing => (
            <ProductCard {...listing} key={listing._id} user={true} />
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
