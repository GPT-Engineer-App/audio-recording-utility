const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const splitAudio = (inputFile, segmentDuration, outputDir) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputFile, (err, metadata) => {
      if (err) return reject(err);

      const duration = metadata.format.duration;
      const segments = Math.ceil(duration / segmentDuration);
      const promises = [];

      for (let i = 0; i < segments; i++) {
        const startTime = i * segmentDuration;
        const outputFilePath = path.join(outputDir, `segment_${i + 1}.mp3`);

        const command = ffmpeg(inputFile)
          .setStartTime(startTime)
          .setDuration(segmentDuration)
          .output(outputFilePath)
          .on('end', () => {
            console.log(`Segment ${i + 1} created successfully`);
          })
          .on('error', (err) => {
            console.error(`Error creating segment ${i + 1}:`, err);
            reject(err);
          });

        promises.push(new Promise((resolve, reject) => {
          command.run();
          command.on('end', resolve);
          command.on('error', reject);
        }));
      }

      Promise.all(promises)
        .then(() => resolve(`All ${segments} segments created successfully`))
        .catch(reject);
    });
  });
};

module.exports = splitAudio;