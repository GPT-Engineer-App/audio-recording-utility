import React, { useState } from 'react';
import { Box, Text, Input, Button, VStack } from "@chakra-ui/react";

const AudioSplitter = () => {
  const [segmentLength, setSegmentLength] = useState("");

  const handleSegmentLengthChange = (e) => setSegmentLength(e.target.value);

  const handleSplitAudio = () => {
    // Logic to split the audio file based on segment length
    console.log(`Splitting audio file into segments of ${segmentLength} seconds`);
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl">Audio Splitter</Text>
      <VStack spacing={4}>
        <Text>How long do you want each segment to be?</Text>
        <Input type="number" value={segmentLength} onChange={handleSegmentLengthChange} placeholder="Enter segment length in seconds" />
        <Button onClick={handleSplitAudio} colorScheme="teal">Split Audio</Button>
      </VStack>
    </Box>
  );
};

export default AudioSplitter;