import { Center } from '@chakra-ui/react';
import { useState } from 'react';
import LoginCard from '../components/LoginCard';
import SignupCard from '../components/SignupCard';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Center>
      {isRegister ? (
        <SignupCard toggle={() => setIsRegister(!isRegister)} />
      ) : (
        <LoginCard toggle={() => setIsRegister(!isRegister)} />
      )}
    </Center>
  );
};

export default Auth;
