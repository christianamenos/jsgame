function start() {
    console.log('Hello world');
}

// Expose the function globally
(window as any).start = start;