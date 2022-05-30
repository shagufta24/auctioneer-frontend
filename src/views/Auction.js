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
  FormControl,
  InputGroup,
  FormLabel,
  NumberInput,
  InputLeftElement,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useLocalStorage from '../hooks/useLocalStorage';
import { getListingById, makeBid } from '../lib/api';
import { authAtom } from '../recoil/auth/atom';

export default function Auction() {
  const { productId } = useParams();
  console.log('PIIID', productId);
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [bid, setBid] = useState('');
  const [auth, _] = useRecoilState(authAtom);
  const [errorMsg, setErrorMsg] = useState('');
  const [bidLoader, setBidLoader] = useState(false);
  const [LSEmail, _1] = useLocalStorage('email', null);

  useEffect(() => {
    const getListingDetails = async () => {
      const res = await getListingById(productId);
      setDetails(res.data.listing);
      setBid(res.data.listing.cost + 50);
      setLoading(false);
    };
    console.log('UE');
    getListingDetails();
  }, [productId]);

  const fireBid = async () => {
    const email = LSEmail;
    setBidLoader(true);
    if (bid <= details.cost + 50 && details.bids.length > 0) {
      setErrorMsg('Bid must be atleast 50₹ greater than current cost');
      setBidLoader(false);
      return;
    }
    try {
      const res = await makeBid(productId, email, bid);
      console.log(res);
      window.location.reload(false);
    } catch (e) {
      setErrorMsg(e);
    } finally {
      setBidLoader(false);
    }
  };
  return (
    <Container maxW={'7xl'}>
      {console.log('DETAILS', details)}
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
              Current highest bid: ₹
              {details ? details.cost : <Spinner size={'xs'} />}
            </Text>
          </Box>
          {details ? (
            details.status === 'open' ? (
              <FormControl>
                <FormLabel>Make bid</FormLabel>
                <NumberInput
                  defaultValue={details ? details.cost + 50 : 100}
                  precision={2}
                  step={50}
                  min={details ? details.cost : 50}
                  onChange={e => setBid(e)}
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children="₹"
                    />
                    <NumberInputField pl={8} value={bid} />
                  </InputGroup>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            ) : (
              <Text fontSize={'lg'} color="red.500" fontWeight={'bold'}>
                SOLD!
              </Text>
            )
          ) : (
            <Spinner size={'xs'} />
          )}
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={fireBid}
            isLoading={bidLoader}
            isDisabled={details ? details.status === 'sold' : false}
          >
            Submit
          </Button>
          {errorMsg ? (
            <Text fontSize="sm" color="red.400" align="center">
              {errorMsg}
            </Text>
          ) : null}
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
