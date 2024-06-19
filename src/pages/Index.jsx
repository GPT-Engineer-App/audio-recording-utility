import { useState } from "react";
import { Container, VStack, Button, Text, Box, Select, Input, useToast } from "@chakra-ui/react";

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [vadEnabled, setVadEnabled] = useState(false);
  const [audioSource, setAudioSource] = useState("");
  const [saveDirectory, setSaveDirectory] = useState("");
  const [recordingQuality, setRecordingQuality] = useState("High");
  const [scheduledRecording, setScheduledRecording] = useState("");
  const toast = useToast();

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording started.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording stopped.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleToggleVAD = () => {
    setVadEnabled(!vadEnabled);
    toast({
      title: `Voice Activation Detection ${vadEnabled ? "disabled" : "enabled"}.`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSetAudioSource = (e) => setAudioSource(e.target.value);
  const handleSetSaveDirectory = (e) => setSaveDirectory(e.target.value);
  const handleSetRecordingQuality = (e) => setRecordingQuality(e.target.value);
  const handleSetScheduledRecording = (e) => setScheduledRecording(e.target.value);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Audio Recording Utility</Text>
        <Button onClick={handleStartRecording} colorScheme="green" isDisabled={isRecording}>Start Recording</Button>
        <Button onClick={handleStopRecording} colorScheme="red" isDisabled={!isRecording}>Stop Recording</Button>
        <Button onClick={handleToggleVAD} colorScheme="blue">{vadEnabled ? "Disable VAD" : "Enable VAD"}</Button>
        <Box>
          <Text>Set Audio Source:</Text>
          <Input value={audioSource} onChange={handleSetAudioSource} placeholder="Enter audio source" />
        </Box>
        <Box>
          <Text>Set Save Directory:</Text>
          <Input value={saveDirectory} onChange={handleSetSaveDirectory} placeholder="Enter save directory" />
        </Box>
        <Box>
          <Text>Set Recording Quality:</Text>
          <Select value={recordingQuality} onChange={handleSetRecordingQuality}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </Box>
        <Box>
          <Text>Set Scheduled Recording:</Text>
          <Input value={scheduledRecording} onChange={handleSetScheduledRecording} placeholder="Enter schedule" />
        </Box>
        <Button colorScheme="teal">View Logs</Button>
        <Button colorScheme="teal">View Summary Log</Button>
        <Button colorScheme="teal">View Error Log</Button>
        <Button colorScheme="teal">Split Audio File</Button>
        <Button colorScheme="teal">View Current Settings</Button>
        <Button colorScheme="gray">Exit</Button>
      </VStack>
    </Container>
  );
};

export default Index;