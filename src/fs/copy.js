const copy = async () => {
    // Write your code here Copy
};

await copy();
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function copyFolder() {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const sourcePath = path.join(currentDirPath, 'files');
  const destinationPath = path.join(currentDirPath, 'files_copy');

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

copyFolder()
