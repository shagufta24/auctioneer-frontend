import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

function ProductCard({
  _id,
  desc,
  features,
  max_cost,
  name,
  specs,
  subtitle,
  image,
  isNew,
  cost,
  status,
  sold_to,
  user,
}) {
  const navigate = useNavigate();
  const [thisUser, _] = useLocalStorage('userId', null);
  return (
    <Flex
      p={4}
      alignItems="center"
      justifyContent="center"
      onClick={() => navigate(`/product/${_id}`)}
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        w="350px"
        h="400px"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        _hover={{
          cursor: 'pointer',
        }}
      >
        {isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Image
          src={image || data.imageURL}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          h={'250px'}
          w="full"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
            <Box alignContent={'center'}>
              {status === 'sold' && sold_to === thisUser ? (
                <Badge
                  px="2"
                  alignItems="center"
                  fontSize="0.8em"
                  colorScheme="green"
                >
                  BOUGHT!
                </Badge>
              ) : status === 'sold' ? (
                <Badge px="2" fontSize="0.8em" colorScheme="red">
                  SOLD!
                </Badge>
              ) : (
                <Badge px="2" fontSize="0.8em" colorScheme="blue">
                  ACTIVE
                </Badge>
              )}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating
              rating={Math.random() * 5}
              numReviews={Math.ceil(Math.random() * 100)}
            />
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                ₹
              </Box>
              {cost}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ProductCard;
