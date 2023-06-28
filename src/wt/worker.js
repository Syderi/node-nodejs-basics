import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const calculateFibonacci = async (n) => {
  const result = nthFibonacci(n);
  return result;
};

const sendResult = async () => {
  parentPort.on('message', async (n) => {
    try {
      const result = await calculateFibonacci(n);
      parentPort.postMessage(result);
    } catch (error) {
      parentPort.postMessage(null);
    }
  });
};

sendResult();