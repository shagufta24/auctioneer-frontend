import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { productId } = useParams();
  const [stateObj, setStateObj] = useState({});
  useEffect(() => {}, []);

  return <Box></Box>;
}
