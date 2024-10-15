import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Image } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const About = () => {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    const fetchAboutContent = async () => {
      const contentDoc = await getDoc(doc(db, 'content', 'main'));
      if (contentDoc.exists()) {
        setAboutContent(contentDoc.data().aboutUs);
      }
    };
    fetchAboutContent();
  }, []);

  return (
    <Box maxWidth="800px" margin="auto" mt={8} p={4}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl">About Us</Heading>
        <Image
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Cyber Security"
          borderRadius="md"
        />
        <Text fontSize="lg">{aboutContent}</Text>
      </VStack>
    </Box>
  );
};

export default About;