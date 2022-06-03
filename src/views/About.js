import { Stack, Text } from '@chakra-ui/react';

export default function About() {
  return (
    <Stack spacing={3} p={8}>
      <Text fontSize="2xl" textAlign={'center'}>
        ABOUT
      </Text>
      <Text fontSize="md">
        Welcome to the Auctioneer, the most reliable online auction platform for
        students. Let's get bidding ✌️
      </Text>
      <Text fontSize={'md'}>
        With the rising reliance of the general populace on easy-to-access
        applications to acccomplish their daily tasks, the resurgence of the old
        fashioned practice of auctioning is inevitable. Auctioning may seem as a
        relic of the past, but in this current atmosphere of electronic
        property, coupled with aging tangible objects appreciating in their
        value, auctioning may just be one of the most relevant practices right
        now. That's where we come in. The Auctioneer provides you with a
        user-friendly online auctioning platform, where you can buy, sell, bid
        and view products with just the touch of a button. Biddings are updated
        in real-time, and each user and/or product has an individual rating
        score to gauge it's legibility and trust. All buying, selling and rating
        can be achieved through a single user account, there's no need to make
        seperate merchant and customer accounts for different purposes. Our
        primary motive is to provide you with simplicity.
      </Text>
      <Text fontSize={'md'}>
        It's fast, it's free, and it gets the job done, just how you like it.
        It's the Auctioneer.
      </Text>
    </Stack>
  );
}
