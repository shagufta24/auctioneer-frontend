import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Switch,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { register } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export default function SignupCard({ toggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setAccessToken] = useLocalStorage('accessToken', null);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const [regObj, setRegObj] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });

  const handleSubmit = async () => {
    try {
      const res = await register(regObj);
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onChange={e =>
                      setRegObj({ ...regObj, firstName: e.target.value })
                    }
                    value={regObj.firstName}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={e =>
                      setRegObj({ ...regObj, lastName: e.target.value })
                    }
                    value={regObj.lastName}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl>
              <Select
                id="gender"
                placeholder="Gender"
                isRequired
                variant="filled"
                onChange={e => setRegObj({ ...regObj, gender: e.target.value })}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={e => setRegObj({ ...regObj, email: e.target.value })}
                value={regObj.email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={e =>
                    setRegObj({ ...regObj, password: e.target.value })
                  }
                  value={regObj.password}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Sign up
              </Button>
              {errorMsg ? (
                <Text fontSize="sm" color="red.400" align="center">
                  {errorMsg}
                </Text>
              ) : null}
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link color={'blue.400'} onClick={() => toggle()}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
