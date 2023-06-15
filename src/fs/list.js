import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = path.join(__dirname, 'files');

const listFiles = async () => {
  try {
    const files = await fs.readdir(folderPath);
    files.forEach((el) => console.log(el));
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

listFiles();
