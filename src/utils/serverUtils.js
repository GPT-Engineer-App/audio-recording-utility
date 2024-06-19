import axios from 'axios';

export const fetchAudioDevices = async () => {
  try {
    const response = await axios.get('/api/audio-devices');
    return response.data.devices;
  } catch (error) {
    console.error('Error fetching audio devices:', error);
    return [];
  }
};

export const fetchSaveDirectory = async () => {
  try {
    const response = await axios.get('/api/save-directory');
    return response.data.directory;
  } catch (error) {
    console.error('Error fetching save directory:', error);
    return '';
  }
};