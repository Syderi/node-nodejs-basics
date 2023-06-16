import fs from 'fs';
import zlib from 'zlib';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const filePathToGz = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  try {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(filePathToGz);
    const gzip = zlib.createGzip();
    readStream.pipe(gzip).pipe(writeStream);
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
    console.log('Compression complete.');
  } catch (error) {
    console.error('Compression failed:', error);
    throw Error('FS operation failed');
  }
};

await compress();
