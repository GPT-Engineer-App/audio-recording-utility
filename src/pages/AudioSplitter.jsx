import React, { useState } from 'react';
import { Box, Text, Input, Button, VStack, Heading, Divider, Flex } from "@chakra-ui/react";

const AudioSplitter = () => {
  const [segmentLength, setSegmentLength] = useState("");

  const handleSegmentLengthChange = (e) => setSegmentLength(e.target.value);

  const handleSplitAudio = () => {
    // Logic to split the audio file based on segment length
    console.log(`Splitting audio file into segments of ${segmentLength} seconds`);
  };

  return (
    <>
      <Box as="header" w="100%" p={4} bg="teal.500" color="white" textAlign="center">
        <Heading as="h1" size="xl">Audio Splitter</Heading>
        <Text fontSize="lg">Split your audio files into smaller segments</Text>
      </Box>
      <Flex direction="column" align="center" justify="center" p={4}>
        <VStack spacing={4} w="100%" maxW="container.md">
          <VStack spacing={4} align="start">
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold">Segment Length:</Text>
              <Input type="number" value={segmentLength} onChange={handleSegmentLengthChange} placeholder="Enter segment length in seconds" />
              <Divider />
            </Box>
            <Box w="100%">
              <Button onClick={handleSplitAudio} colorScheme="teal">Split Audio</Button>
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </>
  );
};

export default AudioSplitter;