import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptPath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  return new Promise((resolve, reject) => {
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
};

spawnChildProcess(['arg1', 'arg2'])
  .then(() => console.log('Child process completed'))
  .catch((error) => console.error('Child process failed:', error));
