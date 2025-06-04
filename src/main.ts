import Test from './test.js';

function start() {
    console.log('Hello world');
    new Test();
}

// Expose the function globally
(window as any).start = start;