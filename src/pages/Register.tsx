import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Link, useToast, Select } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const generateIdentificationNumber = (state: string, city: string) => {
    const statePrefix = state.substring(0, 2).toUpperCase();
    const cityPrefix = city.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    return `${statePrefix}${cityPrefix}${randomNum}`;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const identificationNumber = generateIdentificationNumber(state, city);
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        mobile,
        state,
        city,
        identificationNumber,
        createdAt: new Date(),
      });
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create an account.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading>Register</Heading>
        <form onSubmit={handleRegister}>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Mobile Number</FormLabel>
            <Input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>State</FormLabel>
            <Select placeholder="Select state" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
              {/* Add more states as needed */}
            </Select>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>City</FormLabel>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="brand" width="full" mt={4}>
            Register
          </Button>
        </form>
        <Text mt={4}>
          Already have an account?{' '}
          <Link as={RouterLink} to="/login" color="brand.500">
            Login here
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register;