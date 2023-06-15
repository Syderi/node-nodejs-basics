import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function copy() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourcePath = path.join(__dirname, 'files');
  const destinationPath = path.join(__dirname, 'files_copy');

  try {
    await fs.access(sourcePath);
    await fs.access(destinationPath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(destinationPath);
      await copyFiles(sourcePath, destinationPath);
    } else {
      throw error;
    }
  }
}

async function copyFiles(sourcePath, destinationPath) {
  const files = await fs.readdir(sourcePath);

  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file);
    const destinationFilePath = path.join(destinationPath, file);

    const fileStats = await fs.stat(sourceFilePath);
    if (fileStats.isDirectory()) {
      await fs.mkdir(destinationFilePath);
      await copyFiles(sourceFilePath, destinationFilePath);
    } else {
      await fs.copyFile(sourceFilePath, destinationFilePath);
    }
  }
}

copy()
