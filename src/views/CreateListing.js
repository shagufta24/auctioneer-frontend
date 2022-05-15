import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import ImageUploading from 'react-images-uploading';
import { useState } from 'react';

export default function CreateListing() {
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [details, setDetails] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          List a product at the auction
        </Heading>
        <FormControl id="userName">
          <FormLabel>Picture</FormLabel>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                {imageList.length === 0 ? (
                  <Center w="full">
                    <Button w="full" onClick={onImageUpload}>
                      Add Image
                    </Button>
                  </Center>
                ) : null}

                {imageList.map((image, index) => (
                  <Stack
                    key={index}
                    direction={['column', 'row']}
                    spacing={6}
                    className="image-item"
                  >
                    <Center>
                      <Avatar size="xl" src={image.data_url}>
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                          onClick={() => onImageRemove(index)}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => onImageUpdate(index)}>
                        Change Image
                      </Button>
                    </Center>
                  </Stack>
                ))}
              </div>
            )}
          </ImageUploading>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Item name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Starting cost</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
