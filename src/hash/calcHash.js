import fs from 'fs/promises';
import crypto from 'crypto';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  try {
    const data = await fs.readFile(filePath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    process.stdout.write(hash);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

calculateHash();
