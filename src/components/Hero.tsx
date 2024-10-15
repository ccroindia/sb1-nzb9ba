import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const Hero = () => {
  return (
    <Box
      py={20}
      bgImage="url('https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"
      bgPosition="center"
      bgSize="cover"
      position="relative"
    >
      <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="rgba(0,0,0,0.7)" />
      <VStack
        spacing={8}
        maxW="container.xl"
        mx="auto"
        px={4}
        position="relative"
        zIndex={1}
        textAlign="center"
      >
        <Heading as="h2" size="2xl">Welcome to CosmicCrypto</Heading>
        <Text fontSize="xl">Explore the universe of digital assets</Text>
        <Button
          leftIcon={<FaStar />}
          colorScheme="blue"
          size="lg"
          rounded="full"
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  );
};

export default Hero;