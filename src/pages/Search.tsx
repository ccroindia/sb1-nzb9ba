import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('identificationNumber', '==', searchTerm));

    try {
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for members:', error);
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" mt={8} p={4}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl">Search Members</Heading>
        <Box>
          <Input
            placeholder="Enter Identification Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mr={2}
          />
          <Button onClick={handleSearch} colorScheme="brand" mt={2}>
            Search
          </Button>
        </Box>
        {searchResults.length > 0 ? (
          <SimpleGrid columns={1} spacing={8}>
            {searchResults.map((member) => (
              <Box key={member.id} borderWidth={1} borderRadius="lg" p={4}>
                <Image
                  src={member.photoURL || "https://via.placeholder.com/200"}
                  alt={member.fullName}
                  borderRadius="full"
                  boxSize="200px"
                  objectFit="cover"
                  mb={4}
                />
                <Text fontWeight="bold">Full Name: {member.fullName}</Text>
                <Text>Rank: {member.rank}</Text>
                <Text>Branch: {member.branch}</Text>
                <Text>Present Address: {member.presentAddress?.line1}, {member.presentAddress?.city}, {member.presentAddress?.state}</Text>
                <Text>Identification Number: {member.identificationNumber}</Text>
                <Text>Validity: {member.expiryDate}</Text>
                <Text>Blood Group: {member.bloodGroup}</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No results found. Please try a different Identification Number.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Search;