import React, { useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/react";
import { Container, VStack, Button, Text, Box, Select, Input, Menu, MenuButton, MenuList, MenuItem, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Heading, Tooltip, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { ChevronDownIcon, InfoIcon, SettingsIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { fetchAudioDevices, fetchSaveDirectory } from '../utils/serverUtils';

const Index = () => {
  console.log("Rendering Index component");

  const [isRecording, setIsRecording] = useState(false);
  const [vadEnabled, setVadEnabled] = useState(false);
  const [audioSource, setAudioSource] = useState("");
  const [saveDirectory, setSaveDirectory] = useState("");
  const [recordingQuality, setRecordingQuality] = useState("High");
  const [scheduledRecording, setScheduledRecording] = useState(null);
  const [streamPort, setStreamPort] = useState(3000);
  const [lowPassFilter, setLowPassFilter] = useState(0);
  const [highPassFilter, setHighPassFilter] = useState(0);
  const [compressor, setCompressor] = useState(0);
  const [graphicEQSettings, setGraphicEQSettings] = useState({
    60: 0,
    170: 0,
    310: 0,
    600: 0,
    1000: 0,
    3000: 0,
    6000: 0,
    12000: 0,
    14000: 0,
    16000: 0,
  });
  const [videoSource, setVideoSource] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [advancedSettings, setAdvancedSettings] = useState({});
  const [availableAudioSources, setAvailableAudioSources] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching audio devices and setting video source");
    setVideoSource("http://localhost:3000/stream/streamed_audio.mp3");
    fetchAudioDevices().then(devices => setAvailableAudioSources(devices));
  }, []);

  const handleStartRecording = () => {
    console.log("Starting recording");
    setIsRecording(true);
    toast({
      title: "Recording started.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleStopRecording = () => {
    console.log("Stopping recording");
    setIsRecording(false);
    toast({
      title: "Recording stopped.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleToggleVAD = () => {
    console.log("Toggling VAD");
    setVadEnabled(!vadEnabled);
    toast({
      title: `Voice Activation Detection ${vadEnabled ? "disabled" : "enabled"}.`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSetAudioSource = (e) => setAudioSource(e.target.value);
  const handleSetRecordingQuality = (e) => setRecordingQuality(e.target.value);
  const handleSetScheduledRecording = (date) => setScheduledRecording(date);
  const handleSetStreamPort = (e) => setStreamPort(e.target.value);
  const handleSetLowPassFilter = (val) => setLowPassFilter(val);
  const handleSetHighPassFilter = (val) => setHighPassFilter(val);
  const handleSetCompressor = (val) => setCompressor(val);
  const handleGraphicEQChange = (frequency, value) => {
    setGraphicEQSettings((prevSettings) => ({ ...prevSettings, [frequency]: value }));
  };

  const handleDateTimeInputChange = (e) => {
    const input = e.target.value;
    setDateTimeInput(input);
    try {
      const parsedDate = parse(input, "yyyy-MM-dd/h:mma", new Date());
      setScheduledRecording(parsedDate);
    } catch (error) {
      console.error("Invalid date format:", error);
    }
  };

  const handleViewCurrentSettings = () => {
    navigate("/config");
  };

  const handleAudioSplitter = () => {
    navigate("/audio-splitter");
  };

  const resetSettings = () => {
    console.log("Resetting settings");
    setIsRecording(false);
    setVadEnabled(false);
    setAudioSource("");
    setSaveDirectory("");
    setRecordingQuality("High");
    setScheduledRecording(null);
    setStreamPort(3000);
    setLowPassFilter(0);
    setHighPassFilter(0);
    setCompressor(0);
    setGraphicEQSettings({
      60: 0,
      170: 0,
      310: 0,
      600: 0,
      1000: 0,
      3000: 0,
      6000: 0,
      12000: 0,
      14000: 0,
      16000: 0,
    });
    setAdvancedSettings({});
  };

  const handleSetSaveDirectory = async () => {
    console.log("Setting save directory");
    const directory = await fetchSaveDirectory();
    setSaveDirectory(directory);
  };

  return (
    <ErrorBoundary>
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box as="header" w="100%" p={4} bg="teal.500" color="white" textAlign="center">
          <Heading as="h1" size="xl">Audio Recording Utility</Heading>
          <Text fontSize="lg">Record, split, and manage your audio files with ease</Text>
        </Box>
        <Flex direction="column" align="center" justify="center" p={4}>
          <VStack spacing={4} w="100%" maxW="container.md">
            <Text fontSize="2xl">Audio Recording Utility</Text>
            <Tooltip label="Start recording" aria-label="Start recording tooltip">
              <IconButton icon={<ViewIcon />} onClick={handleStartRecording} colorScheme="green" isDisabled={isRecording} />
            </Tooltip>
            <Tooltip label="Stop recording" aria-label="Stop recording tooltip">
              <IconButton icon={<RepeatIcon />} onClick={handleStopRecording} colorScheme="red" isDisabled={!isRecording} />
            </Tooltip>
            <Tooltip label="Toggle VAD" aria-label="Toggle VAD tooltip">
              <IconButton icon={<SettingsIcon />} onClick={handleToggleVAD} colorScheme="blue" />
            </Tooltip>
            <Box>
              <Text>Set Audio Source:</Text>
              <Select value={audioSource} onChange={handleSetAudioSource} placeholder="Select audio source">
                {availableAudioSources.map((source, index) => (
                  <option key={index} value={source}>{source}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <Text>Set Save Directory:</Text>
              <Button onClick={handleSetSaveDirectory} colorScheme="teal">Select Save Directory</Button>
              <Input type="text" value={saveDirectory} readOnly placeholder="Selected save directory" />
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
              <DatePicker
                selected={scheduledRecording}
                onChange={handleSetScheduledRecording}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select date and time"
              />
              <Input type="text" value={dateTimeInput} onChange={handleDateTimeInputChange} placeholder="YYYY-MM-DD/HH:MMAM/PM" />
            </Box>
            <Box>
              <Text>Set Stream Port:</Text>
              <Input type="number" value={streamPort} onChange={handleSetStreamPort} placeholder="Enter stream port" />
            </Box>
            <Box>
              <Text>Low Pass Filter:</Text>
              <Slider value={lowPassFilter} onChange={handleSetLowPassFilter} min={0} max={100}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box>
              <Text>High Pass Filter:</Text>
              <Slider value={highPassFilter} onChange={handleSetHighPassFilter} min={0} max={100}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box>
              <Text>Compressor:</Text>
              <Slider value={compressor} onChange={handleSetCompressor} min={0} max={100}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box>
              <Text>Graphic Equalizer:</Text>
              {Object.keys(graphicEQSettings).map((frequency) => (
                <Box key={frequency}>
                  <Text>{frequency} Hz:</Text>
                  <Slider
                    value={graphicEQSettings[frequency]}
                    onChange={(val) => handleGraphicEQChange(frequency, val)}
                    min={-10}
                    max={10}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
              ))}
            </Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Logs
              </MenuButton>
              <MenuList>
                <MenuItem>View Logs</MenuItem>
                <MenuItem>View Summary Log</MenuItem>
                <MenuItem>View Error Log</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Main Menu
              </MenuButton>
              <MenuList>
                <MenuItem>Low/High Pass Filters</MenuItem>
                <MenuItem>Compressor</MenuItem>
                <MenuItem>Noise Reduction</MenuItem>
                <MenuItem>Noise Gate</MenuItem>
              </MenuList>
            </Menu>
            <Button onClick={handleViewCurrentSettings} colorScheme="teal">View Current Settings</Button>
            <Button onClick={handleAudioSplitter} colorScheme="teal">Split Audio File</Button>
            <Button onClick={resetSettings} colorScheme="gray">Reset Settings</Button>
            <Box>
              <Text>Audio Stream:</Text>
              <video controls>
                <source src={videoSource} type="audio/mp3" />
                Your browser does not support the audio element.
              </video>
            </Box>
          </VStack>
        </Flex>
        <Spacer />
        <Box as="footer" w="100%" p={4} bg="teal.500" color="white" textAlign="center">
          <Text>&copy; 2023 Audio Recording Utility. All rights reserved.</Text>
        </Box>
      </Container>
    </ErrorBoundary>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught an error", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text color="red.500">An error occurred while rendering the component.</Text>;
    }

    return this.props.children; 
  }
}

export default Index;