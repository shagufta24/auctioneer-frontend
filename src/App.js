import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import Home from './layouts/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './layouts/Auth';
import CreateListing from './views/CreateListing';
import Auction from './views/Auction';
import UserListings from './views/UserListings';
import About from './views/About';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="/" element={<Landing />} />
          <Route path="product" element={<ProtectedRoute />}>
            <Route path=":productId" element={<Auction />} />
          </Route>
          <Route path="create" element={<ProtectedRoute />}>
            <Route path="listing" element={<CreateListing />} />
          </Route>
          <Route path="/my-listings" element={<UserListings />} />
        </Route>

        <Route path="auth" element={<Auth />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
