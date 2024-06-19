import { useState } from "react";
import { Container, VStack, Button, Text, Box, Select, Input, useToast, Menu, MenuButton, MenuList, MenuItem, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Index = () => {
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
  const [equalizerSettings, setEqualizerSettings] = useState({ bass: 0, mid: 0, treble: 0 });
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
  const handleSetScheduledRecording = (date) => setScheduledRecording(date);
  const handleSetStreamPort = (e) => setStreamPort(e.target.value);
  const handleSetLowPassFilter = (val) => setLowPassFilter(val);
  const handleSetHighPassFilter = (val) => setHighPassFilter(val);
  const handleSetCompressor = (val) => setCompressor(val);
  const handleEqualizerChange = (type, value) => {
    setEqualizerSettings((prevSettings) => ({ ...prevSettings, [type]: value }));
  };
  const handleSaveStreamedAudio = () => {
    // Logic to save streamed audio
    toast({
      title: "Streamed audio saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const availableAudioSources = ["Microphone", "System Audio", "External Device"]; // Example options

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Audio Recording Utility</Text>
        <Button onClick={handleStartRecording} colorScheme="green" isDisabled={isRecording}>Start Recording</Button>
        <Button onClick={handleStopRecording} colorScheme="red" isDisabled={!isRecording}>Stop Recording</Button>
        <Button onClick={handleToggleVAD} colorScheme="blue">{vadEnabled ? "Disable VAD" : "Enable VAD"}</Button>
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
          <Input type="file" webkitdirectory="true" value={saveDirectory} onChange={handleSetSaveDirectory} placeholder="Select save directory" />
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
          <Text>Bass:</Text>
          <Slider value={equalizerSettings.bass} onChange={(val) => handleEqualizerChange('bass', val)} min={-10} max={10}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box>
          <Text>Mid:</Text>
          <Slider value={equalizerSettings.mid} onChange={(val) => handleEqualizerChange('mid', val)} min={-10} max={10}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box>
          <Text>Treble:</Text>
          <Slider value={equalizerSettings.treble} onChange={(val) => handleEqualizerChange('treble', val)} min={-10} max={10}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
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
        <Button colorScheme="teal">Split Audio File</Button>
        <Button colorScheme="teal">View Current Settings</Button>
        <Button colorScheme="gray">Exit</Button>
        <Button onClick={handleSaveStreamedAudio} colorScheme="purple">Save Streamed Audio</Button>
      </VStack>
    </Container>
  );
};

export default Index;