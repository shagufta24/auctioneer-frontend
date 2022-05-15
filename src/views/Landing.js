import { Box, HStack } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

export default function Landing() {
  return (
    <Box>
      <HStack wrap="wrap" justifyContent="space-around">
        <ProductCard id="1" />
        <ProductCard id="2" />
        <ProductCard id="3" />
        <ProductCard id="4" />
      </HStack>
    </Box>
  );
}
