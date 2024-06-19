import React, { useState } from 'react';
import axios from 'axios';
import { Box, Text, Input, Button, VStack, Heading, Divider, Flex } from "@chakra-ui/react";

const AudioSplitter = () => {
  const [segmentLength, setSegmentLength] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  const handleSegmentLengthChange = (e) => setSegmentLength(e.target.value);

  const handleAudioFileChange = (e) => setAudioFile(e.target.files[0]);

  const handleSplitAudio = async () => {
    if (!audioFile || !segmentLength) {
      alert("Please upload an audio file and enter a segment length.");
      return;
    }

    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('segmentLength', segmentLength);

    try {
      const response = await axios.post('/split', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error splitting audio file:", error);
    }
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
              <Text fontSize="lg" fontWeight="bold">Upload Audio File:</Text>
              <Input type="file" accept="audio/*" onChange={handleAudioFileChange} />
              <Divider />
            </Box>
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