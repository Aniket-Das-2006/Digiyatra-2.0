const ffmpeg = require('ffmpeg-static');
const { execFile } = require('child_process');
const path = require('path');

const compressVideo = (inputFile, outputFile) => {
  return new Promise((resolve, reject) => {
    console.log(`Compressing ${inputFile}...`);
    
    // Full Length, Visually Lossless, High Compatibility for Smooth Hardware Decoding
    const args = [
      '-y',
      '-i', inputFile,
      '-vcodec', 'libx264',
      '-crf', '28',             // Good compression for web & under 100MB GitHub limit
      '-preset', 'fast',        // Good balance of speed and compression
      '-profile:v', 'main',     // Highly compatible profile for GPU hardware decoding
      '-pix_fmt', 'yuv420p',    // Standard color space for hardware decoding
      '-an',                    // Remove audio
      '-movflags', '+faststart',// Optimize for web streaming
      outputFile
    ];

    const child = execFile(ffmpeg, args, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error compressing ${inputFile}:`, error);
        return reject(error);
      }
      console.log(`Successfully compressed to ${outputFile}`);
      resolve();
    });
  });
};

const run = async () => {
  try {
    const publicDir = path.join(__dirname, 'public');
    
    await compressVideo(path.join(publicDir, 'HV_orig.mp4'), path.join(publicDir, 'HV.mp4'));
    await compressVideo(path.join(publicDir, 'HC_orig.mp4'), path.join(publicDir, 'HC.mp4'));
    
    console.log('All done!');
  } catch (err) {
    console.error(err);
  }
};

run();
