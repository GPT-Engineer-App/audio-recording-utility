import React from 'react';
import { Box, Text, VStack } from "@chakra-ui/react";

const Config = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl">Advanced Settings</Text>
      <VStack spacing={4}>
        {/* Display advanced settings here */}
        <Text>Setting 1: Value</Text>
        <Text>Setting 2: Value</Text>
        <Text>Setting 3: Value</Text>
        {/* Add more settings as needed */}
      </VStack>
    </Box>
  );
};

export default Config;