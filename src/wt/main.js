import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const threads = os.cpus().length;
  const promises = [];

  for (let i = 0; i < threads; i++) {
    const promise = new Promise((resolve) => {
      const worker = new Worker(workerPath);
      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result, index: i });
      });
      worker.on('error', (error) => {
        resolve({ status: 'error', data: null, index: i });
      });
      worker.postMessage(i + 10);
    });
    promises.push(promise);
  }

  const results = await Promise.all(promises);
  return results
    .sort((a, b) => a.index - b.index)
    .map(({ status, data }) => ({ status, data }));
};

const printResults = async () => {
  const results = await performCalculations();
  console.log(results);
};

printResults();
