import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, Button, useToast, Avatar, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import UserRegistrationForm from '../components/UserRegistrationForm';

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser({ id: currentUser.uid, ...userDoc.data() });
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box maxWidth="800px" margin="auto" mt={8} p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <VStack align="start" spacing={2}>
          <Heading size="xl">Welcome, {user.fullName}</Heading>
          <Text>Identification Number: {user.identificationNumber}</Text>
        </VStack>
        <Avatar size="xl" name={user.fullName} src={user.photoURL} />
      </Flex>

      {!user.registrationComplete && (
        <Box mb={8}>
          <Text color="red.500" fontWeight="bold">
            Please complete your registration details.
          </Text>
          <Button colorScheme="brand" mt={2} onClick={() => setShowForm(true)}>
            Complete Registration
          </Button>
        </Box>
      )}

      {showForm && <UserRegistrationForm userId={user.id} onComplete={() => setShowForm(false)} />}

      <VStack spacing={4} align="stretch">
        <Button onClick={() => navigate('/dashboard/edit')}>Edit Details</Button>
        <Button onClick={() => navigate('/dashboard/download')}>Download Card</Button>
        <Button onClick={() => navigate('/dashboard/change-password')}>Change Password</Button>
        <Button onClick={() => navigate('/dashboard/renew')}>Renew Membership</Button>
        <Button onClick={handleSignOut} colorScheme="red">
          Sign Out
        </Button>
      </VStack>
    </Box>
  );
};

export default UserDashboard;