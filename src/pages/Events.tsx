import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text, Image, VStack } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = collection(db, 'events');
      try {
        const querySnapshot = await getDocs(eventsRef);
        const eventList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} p={4}>
      <Heading as="h1" size="2xl" mb={8}>Events</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {events.map((event) => (
          <Box key={event.id} borderWidth={1} borderRadius="lg" overflow="hidden">
            <Image src={event.imageUrl} alt={event.title} width="100%" height="200px" objectFit="cover" />
            <VStack p={4} align="start" spacing={2}>
              <Heading as="h3" size="md">{event.title}</Heading>
              <Text>{event.details}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Events;