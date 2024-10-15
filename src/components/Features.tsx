import React from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FaRocket, FaPlanet, FaSatellite } from 'react-icons/fa';

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
}

function Feature({ title, text, icon }: FeatureProps) {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.700'}
        mb={1}
      >
        <Icon as={icon} w={10} h={10} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.400'}>{text}</Text>
    </Stack>
  );
}

export default function Features() {
  return (
    <Box p={4} maxW="container.xl" mx="auto">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} py={10}>
        <Feature
          icon={FaRocket}
          title={'Launch Your Portfolio'}
          text={
            'Get started with our easy-to-use platform and launch your crypto portfolio into the stratosphere.'
          }
        />
        <Feature
          icon={FaPlanet}
          title={'Explore New Worlds'}
          text={
            'Discover a universe of cryptocurrencies and blockchain projects with our comprehensive research tools.'
          }
        />
        <Feature
          icon={FaSatellite}
          title={'Stay Connected'}
          text={
            'Keep track of your investments with real-time updates and alerts, no matter where you are in the galaxy.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}