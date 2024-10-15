import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ContentManagement = () => {
  const [content, setContent] = useState({
    homeHero: '',
    aboutUs: '',
    contactInfo: '',
  });
  const toast = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const contentDoc = await getDoc(doc(db, 'content', 'main'));
      if (contentDoc.exists()) {
        setContent(contentDoc.data());
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prevContent => ({
      ...prevContent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'content', 'main'), content);
      toast({
        title: 'Content Updated',
        description: 'The content has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: 'Error',
        description: 'Failed to update the content.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>Content Management</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Home Hero Content</FormLabel>
            <Textarea
              name="homeHero"
              value={content.homeHero}
              onChange={handleChange}
              placeholder="Enter home page hero content"
            />
          </FormControl>
          <FormControl>
            <FormLabel>About Us Content</FormLabel>
            <Textarea
              name="aboutUs"
              value={content.aboutUs}
              onChange={handleChange}
              placeholder="Enter about us content"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Information</FormLabel>
            <Textarea
              name="contactInfo"
              value={content.contactInfo}
              onChange={handleChange}
              placeholder="Enter contact information"
            />
          </FormControl>
          <Button type="submit" colorScheme="brand">
            Update Content
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ContentManagement;