import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files');

const rename = async () => {
  try {
    await fs.rename(
      path.join(filePath, 'wrongFilename.txt'),
      path.join(filePath, 'properFilename.md')
    );
    console.log('Success');
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await rename();
