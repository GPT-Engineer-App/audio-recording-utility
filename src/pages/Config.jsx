import React from 'react';
import { Box, Text, VStack, Heading, Divider, Flex } from "@chakra-ui/react";

const Config = () => {
  return (
    <>
      <Box as="header" w="100%" p={4} bg="teal.500" color="white" textAlign="center">
        <Heading as="h1" size="xl">Advanced Settings</Heading>
        <Text fontSize="lg">Configure your audio recording preferences</Text>
      </Box>
  <Flex direction="column" align="center" justify="center" p={4}>
        <VStack spacing={4} w="100%" maxW="container.md">
          <VStack spacing={4} align="start">
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold">Setting 1:</Text>
              <Text>Value</Text>
              <Divider />
            </Box>
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold">Setting 2:</Text>
              <Text>Value</Text>
              <Divider />
            </Box>
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold">Setting 3:</Text>
              <Text>Value</Text>
              <Divider />
            </Box>
            {/* Add more settings as needed */}
          </VStack>
        </VStack>
      </Flex>
    </>
  );
};

export default Config;