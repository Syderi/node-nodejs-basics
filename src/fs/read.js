import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const readFile = async () => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    process.stdout.write(content)
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

readFile();
