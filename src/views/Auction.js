import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  HStack,
  Spinner,
  Skeleton,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getListingById } from '../lib/api';

export default function Auction() {
  const { productId } = useParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListingDetails = async () => {
      const res = await getListingById(productId);
      console.log(res.data);
      setDetails(res.data.listing);
      setLoading(false);
    };
    getListingDetails();
  }, []);
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          {details ? (
            <Image
              rounded={'md'}
              alt={'product image'}
              src={details.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
              boxShadow={'md'}
            />
          ) : (
            <Center h={{ base: '100%', sm: '400px', lg: '500px' }} w="full">
              <Spinner size={'xl'} />
            </Center>
          )}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {details ? details.name : <Skeleton h={3} />}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
              as="div"
            >
              ${details ? details.cost : <Spinner size={'xs'} />} USD
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
                as="div"
              >
                {details ? details.subtitle : <Skeleton h={3} />}
              </Text>
              <Text fontSize={'lg'} as="div">
                {details ? details.desc : <Skeleton h={5} />}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Features
              </Text>

              {details ? (
                <HStack spacing={10}>
                  {details.features.map(feature => (
                    <Text key={feature}>{feature}</Text>
                  ))}
                </HStack>
              ) : (
                <Skeleton h={8} />
              )}
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Product Details
              </Text>
              {details ? (
                <VStack w="full">
                  {Object.keys(details.specs).map((v, i) => (
                    <HStack w="full" key={v}>
                      <Text fontWeight={'bold'}>{v}</Text>
                      <Text>{details.specs[v]}</Text>
                    </HStack>
                  ))}
                </VStack>
              ) : (
                <Skeleton h={8} />
              )}
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
