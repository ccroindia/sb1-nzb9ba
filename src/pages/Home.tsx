import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [heroContent, setHeroContent] = useState('');

  useEffect(() => {
    const fetchHeroContent = async () => {
      const contentDoc = await getDoc(doc(db, 'content', 'main'));
      if (contentDoc.exists()) {
        setHeroContent(contentDoc.data().homeHero);
      }
    };
    fetchHeroContent();
  }, []);

  return (
    <Box>
      <Box
        height="calc(100vh - 64px)"
        bgImage="url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          spacing={8}
          textAlign="center"
          bg="rgba(0,0,0,0.7)"
          p={8}
          borderRadius="md"
          color="white"
          maxWidth="800px"
        >
          <Heading as="h1" size="2xl">
            Cyber Crime Reporting Organization
          </Heading>
          <Text fontSize="xl">{heroContent}</Text>
          <Button colorScheme="brand" size="lg">
            Report a Crime
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;