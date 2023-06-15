import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function createFile() {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const filePath = path.join(currentDirPath, 'files', 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
    await fs.access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, fileContent);
    } else {
      throw error;
    }
  }
}

createFile();
