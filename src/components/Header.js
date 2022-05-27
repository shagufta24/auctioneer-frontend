import { ReactNode } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const NavLink = ({ children, to, name }) => <Link to={to}>{name}</Link>;

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [email, setEmail] = useLocalStorage('email', null);
  const [userId, setUserId] = useLocalStorage('userId', null);
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
  const logout = () => {
    setEmail('');
    setUserId('');
    setAccessToken('');
    navigate('/');
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box onClick={() => navigate('/')} _hover={{ cursor: 'pointer' }}>
              <Image src={colorMode === 'light' ? logo : logoDark} />
            </Box>
            <HStack
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              fontWeight="semibold"
              fontSize="lg"
              h="full"
            >
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink to="/create/listing" name="SELL" />
              </Box>
              <Box
                h="full"
                _hover={{ color: 'blue.700', transition: '0.2s ease-out' }}
              >
                <NavLink to="/my-listings" name="HISTORY" />
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
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{email}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
