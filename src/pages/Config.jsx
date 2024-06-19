import React, { useState } from 'react';
import { Box, Text, VStack, Heading, Divider, Flex, Input, Select, Button } from "@chakra-ui/react";

const Config = () => {
  const [audioQuality, setAudioQuality] = useState("High");
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [bitRate, setBitRate] = useState(128);

  const handleAudioQualityChange = (e) => setAudioQuality(e.target.value);
  const handleAudioFormatChange = (e) => setAudioFormat(e.target.value);
  const handleBitRateChange = (e) => setBitRate(e.target.value);

  const handleSaveSettings = () => {
    // Logic to save the settings
    console.log("Settings saved:", { audioQuality, audioFormat, bitRate });
  };

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
              <Text fontSize="lg" fontWeight="bold">Audio Quality:</Text>
              <Select value={audioQuality} onChange={handleAudioQualityChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
              <Divider />
            </Box>
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold">Audio Format:</Text>
              <Select value={audioFormat} onChange={handleAudioFormatChange}>
                <option value="mp3">MP3</option>
                <option value="wav">WAV</option>
                <option value="aac">AAC</option>
              </Select>
              <Divider />
            </Box>
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold">Bit Rate (kbps):</Text>
              <Input type="number" value={bitRate} onChange={handleBitRateChange} placeholder="Enter bit rate" />
              <Divider />
            </Box>
            <Box w="100%">
              <Button onClick={handleSaveSettings} colorScheme="teal">Save Settings</Button>
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </>
  );
};

export default Config;