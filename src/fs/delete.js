import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

const deleteFile = async () => {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

deleteFile();
