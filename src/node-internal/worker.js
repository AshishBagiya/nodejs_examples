const { parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

parentPort.postMessage(fibonacci(workerData));
