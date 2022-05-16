import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import Home from './layouts/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './layouts/Auth';
import CreateListing from './views/CreateListing';
import Auction from './views/Auction';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Landing />} />
          <Route path="product" element={<ProtectedRoute />}>
            <Route path=":productId" element={<Auction />} />
          </Route>
          <Route path="create" element={<ProtectedRoute />}>
            <Route path="listing" element={<CreateListing />} />
          </Route>
        </Route>

        <Route path="auth" element={<Auth />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
