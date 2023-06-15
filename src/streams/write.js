import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  try {
    const writeStream = createWriteStream(filePath, { encoding: 'utf-8' });
    process.stdin.pipe(writeStream);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await write();
