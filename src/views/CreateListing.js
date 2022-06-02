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
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import ImageUploading from 'react-images-uploading';
import { useState } from 'react';

import { addListing } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export default function CreateListing() {
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [specs, setSpecs] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [itemName, setItemName] = useState('');
  const [startingCost, setStartingCost] = useState(15);
  const [subtitle, setSubtitle] = useState('');
  const [desc, setDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [maxCost, setMaxCost] = useState(200);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useLocalStorage('userId', null);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const onEnter = e => {
    if (e.key === 'Enter') {
      setFeatures([...features, e.target.value]);
      setFeatureInput('');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await addListing(
        itemName,
        subtitle,
        startingCost,
        desc,
        features,
        specs,
        images,
        maxCost,
        userId
      );
      console.log(res);
      navigate('/');
    } catch (e) {
      setLoading(false);
      setErrorMsg(
        e.response ? e.response.data.msg : 'Please fill the required fields'
      );
    }
  };
  return (
    <Flex
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
        <FormControl id="itemName" isRequired>
          <FormLabel>Item name</FormLabel>
          <Input
            placeholder=""
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
        </FormControl>
        <FormControl id="startCost" isRequired>
          <FormLabel>Starting cost</FormLabel>
          <NumberInput
            defaultValue={15}
            precision={2}
            step={0.2}
            onChange={e => setStartingCost(e)}
            min={15}
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="₹"
              />
              <NumberInputField pl={8} value={startingCost} />
            </InputGroup>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="maxCost" isRequired>
          <FormLabel>Maximum cost</FormLabel>
          <NumberInput
            defaultValue={200}
            precision={2}
            step={50}
            onChange={e => setMaxCost(e)}
            min={startingCost + 500}
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="₹"
              />
              <NumberInputField pl={8} value={maxCost} />
            </InputGroup>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="subtitle" isRequired>
          <FormLabel>Subtitle</FormLabel>
          <Input
            placeholder=""
            _placeholder={{ color: 'gray.500' }}
            onChange={e => setSubtitle(e.target.value)}
            value={subtitle}
          />
        </FormControl>
        <FormControl id="desc" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder=""
            _placeholder={{ color: 'gray.500' }}
            onChange={e => setDesc(e.target.value)}
            value={desc}
          />
        </FormControl>
        <FormControl id="features" isRequired>
          <FormLabel>Features</FormLabel>
          <Input
            placeholder=""
            _placeholder={{ color: 'gray.500' }}
            value={featureInput}
            onKeyDown={onEnter}
            onChange={e => setFeatureInput(e.target.value)}
          />
        </FormControl>
        {features.length > 0 ? (
          <HStack>
            {features.map(item => (
              <Tag
                size="lg"
                key={item}
                borderRadius="md"
                variant="subtle"
                colorScheme="telegram"
              >
                <TagLabel>{item}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    setFeatures(
                      features.filter(stateItem => stateItem !== item)
                    );
                  }}
                />
              </Tag>
            ))}
          </HStack>
        ) : null}
        <FormControl id="spec" isRequired>
          <FormLabel>Specifications</FormLabel>
          <Textarea
            placeholder="Example: title1:value1,title2,value2 ..."
            _placeholder={{ color: 'gray.500' }}
            value={specs}
            onChange={e => setSpecs(e.target.value)}
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
            isDisabled={loading}
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
            onClick={handleSubmit}
            isLoading={loading}
          >
            Submit
          </Button>
        </Stack>
        {errorMsg ? (
          <Text fontSize="sm" color="red.400" align="center">
            {errorMsg}
          </Text>
        ) : null}
      </Stack>
    </Flex>
  );
}
