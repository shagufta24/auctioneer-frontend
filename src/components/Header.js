import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  HStack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import logo from '../assets/logo.png';
import logoDark from '../assets/logo-dark.png';
import { NavLink, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { getUser } from '../lib/api';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [email, setEmail] = useLocalStorage('email', null);
  const [userId, setUserId] = useLocalStorage('userId', null);
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
  const [headerUser, setHeaderUser] = useState('');
  const logout = () => {
    setEmail('');
    setUserId('');
    setAccessToken('');
    setHeaderUser('');
    navigate('/');
  };
  useEffect(() => {
    const getUserData = async () => {
      const user = await getUser(email).then(res => res.data.user);
      console.log('USER', user);
      setHeaderUser(user);
    };
    getUserData();
  }, [email]);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box onClick={() => navigate('/')} _hover={{ cursor: 'pointer' }}>
              <Image src={colorMode === 'light' ? logo : logoDark} />
            </Box>
            <HStack
              spacing={6}
              display={{ base: 'none', md: 'flex' }}
              fontWeight="semibold"
              fontSize="lg"
              h="full"
            >
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink
                  to="/"
                  name="Buy"
                  style={({ isActive }) =>
                    isActive ? { color: 'skyblue' } : undefined
                  }
                >
                  Buy
                </NavLink>
              </Box>
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink
                  to="create/listing"
                  name="Sell"
                  style={({ isActive }) =>
                    isActive ? { color: 'skyblue' } : undefined
                  }
                >
                  Sell
                </NavLink>
              </Box>
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink
                  to="my-bids"
                  name="My bids"
                  style={({ isActive }) =>
                    isActive ? { color: 'skyblue' } : undefined
                  }
                >
                  My Bids
                </NavLink>
              </Box>
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink
                  to="my-listings"
                  name="My listings"
                  style={({ isActive }) =>
                    isActive ? { color: 'skyblue' } : undefined
                  }
                >
                  My Listings
                </NavLink>
              </Box>
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink
                  to="about"
                  name="About"
                  style={({ isActive }) =>
                    isActive ? { color: 'skyblue' } : undefined
                  }
                >
                  About
                </NavLink>
              </Box>
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  {headerUser ? (
                    <Avatar
                      size={'sm'}
                      src={
                        headerUser.gender === 'M'
                          ? 'https://avatars.dicebear.com/api/male/username.svg'
                          : 'https://avatars.dicebear.com/api/female/username.svg'
                      }
                    />
                  ) : (
                    <Avatar
                      size={'sm'}
                      src={
                        'https://avatars.dicebear.com/api/jdenticon/abas.svg'
                      }
                    />
                  )}
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    {headerUser ? (
                      <Avatar
                        size={'2xl'}
                        src={
                          headerUser.gender === 'M'
                            ? 'https://avatars.dicebear.com/api/male/username.svg'
                            : 'https://avatars.dicebear.com/api/female/username.svg'
                        }
                      />
                    ) : (
                      <Avatar
                        size={'sm'}
                        src={
                          'https://avatars.dicebear.com/api/jdenticon/abas.svg'
                        }
                      />
                    )}
                  </Center>
                  <br />
                  <Center>
                    {email ? (
                      <p>Hello, {headerUser ? headerUser.first_name : ''}</p>
                    ) : (
                      <p>Please log in</p>
                    )}
                  </Center>
                  <br />
                  <MenuDivider />
                  {!email ? (
                    <MenuItem onClick={() => navigate('/auth')}>
                      Log in
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
