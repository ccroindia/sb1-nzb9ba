import React from 'react';
import { Box, Flex, HStack, Link, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold">CCRO</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/">Home</Link>
            <Link as={RouterLink} to="/about">About</Link>
            <Link as={RouterLink} to="/search">Search</Link>
            <Link as={RouterLink} to="/members">Members</Link>
            <Link as={RouterLink} to="/gallery">Gallery</Link>
            <Link as={RouterLink} to="/events">Events</Link>
            <Link as={RouterLink} to="/contact">Contact</Link>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            as={RouterLink}
            to="/login"
            variant={'solid'}
            colorScheme={'brand'}
            size={'sm'}
            mr={4}
            leftIcon={<FaUser />}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;