import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text, Image, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const MemberCard = ({ member }) => (
  <Box borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
    <Image
      src={member.photoURL || "https://via.placeholder.com/200"}
      alt={member.fullName}
      borderRadius="full"
      boxSize="200px"
      objectFit="cover"
      mb={4}
      mx="auto"
    />
    <Text fontWeight="bold" textAlign="center">{member.fullName}</Text>
    <Text textAlign="center">{member.rank}</Text>
  </Box>
);

const Members = () => {
  const [nationalMembers, setNationalMembers] = useState([]);
  const [stateMembers, setStateMembers] = useState([]);
  const [districtMembers, setDistrictMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async (rank, setMembers) => {
      const membersRef = collection(db, 'users');
      const q = query(membersRef, where('rank', '==', rank));
      try {
        const querySnapshot = await getDocs(q);
        const members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMembers(members);
      } catch (error) {
        console.error(`Error fetching ${rank} members:`, error);
      }
    };

    fetchMembers('National Member', setNationalMembers);
    fetchMembers('State Member', setStateMembers);
    fetchMembers('District Member', setDistrictMembers);
  }, []);

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} p={4}>
      <Heading as="h1" size="2xl" mb={8}>Members</Heading>
      <Tabs>
        <TabList>
          <Tab>National Members</Tab>
          <Tab>State Members</Tab>
          <Tab>District Members</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
              {nationalMembers.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
              {stateMembers.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
              {districtMembers.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Members;