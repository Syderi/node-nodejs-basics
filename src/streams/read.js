import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read =  async () => {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on('end', () => {
    process.stdout.write('\n');
  });

  readStream.on('error', (error) => {
    throw new Error('FS operation failed');
  });
};

await read();
