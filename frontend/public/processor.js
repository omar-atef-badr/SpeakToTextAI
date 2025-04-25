// processor.js
class MyProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input[0]) {
      // Flatten input and convert to Int16, then post to main thread
      const float32Array = input[0];
      const buffer = new Int16Array(float32Array.length);
      for (let i = 0; i < float32Array.length; i++) {
        buffer[i] = Math.max(-1, Math.min(1, float32Array[i])) * 32767;
      }

      // Send buffer to main thread
      this.port.postMessage(buffer);
    }
    return true; // keep processor alive
  }
}

registerProcessor('my-processor', MyProcessor);
