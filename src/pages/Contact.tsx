import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: '',
    email: '',
    comments: '',
  });
  const toast = useToast();

  useEffect(() => {
    const fetchContactInfo = async () => {
      const contentDoc = await getDoc(doc(db, 'content', 'main'));
      if (contentDoc.exists()) {
        setContactInfo(contentDoc.data().contactInfo);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...formData,
        timestamp: new Date(),
      });
      toast({
        title: 'Message Sent',
        description: 'We have received your message and will get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        fullName: '',
        mobileNo: '',
        email: '',
        comments: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" mt={8} p={4}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl">Contact Us</Heading>
        <Box dangerouslySetInnerHTML={{ __html: contactInfo }} />
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mobile No</FormLabel>
              <Input name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Comments</FormLabel>
              <Textarea name="comments" value={formData.comments} onChange={handleChange} />
            </FormControl>
            <Button type="submit" colorScheme="brand">
              Send Message
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default Contact;