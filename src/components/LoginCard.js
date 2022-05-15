import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { post } from '../config';
import useLocalStorage from '../hooks/useLocalStorage';

export default function LoginCard({ toggle }) {
  const [loginObj, setLoginObj] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [_, setAccessToken] = useLocalStorage('accessToken', null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await post('/login', loginObj);
      console.log(res);
      setAccessToken(res.data.access_token);
      navigate('/');
    } catch (e) {
      setErrorMsg(e.response.data.msg || 'An error occured, please try again!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to sell or bid for{' '}
            <RouterLink to="/" color="blue.400">
              products
            </RouterLink>
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={e =>
                  setLoginObj({ ...loginObj, email: e.target.value })
                }
                value={loginObj.email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={e =>
                  setLoginObj({ ...loginObj, password: e.target.value })
                }
                value={loginObj.password}
              />
            </FormControl>
            <Stack spacing={errorMsg ? '5' : '10'}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Sign in
              </Button>

              <Center>
                <VStack>
                  {errorMsg ? (
                    <Text fontSize="sm" color="red.400" align="center">
                      {errorMsg}
                    </Text>
                  ) : null}
                  <Link onClick={() => toggle()} color="blue.400">
                    Don't have an account? Sign up
                  </Link>
                </VStack>
              </Center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
