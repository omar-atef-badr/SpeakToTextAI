import React, { useState, useRef } from 'react';
import './recorder.css';

const Recorder = () => {
  const [status, setStatus] = useState('Click "Start" to begin.');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    setTranscript('');
    setStatus('Initializing...');

    const socket = new WebSocket("ws://localhost:8000/ws/transcribe");
    socket.binaryType = "arraybuffer";
    socketRef.current = socket;

    socket.onopen = async () => {
      setStatus('Recording and streaming...');
      setIsRecording(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0); // Float32Array
        const buffer = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
          buffer[i] = Math.max(-1, Math.min(1, input[i])) * 32767; // Clamp + convert to Int16
        }
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(buffer.buffer); // Send raw audio buffer
        }
      };
    };

    socket.onmessage = (event) => {
      setTranscript(prev => prev + event.data + ' ');
    };

    socket.onerror = () => setStatus('WebSocket error');
    socket.onclose = () => {
      setStatus('WebSocket closed');
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStatus('Stopped');

    processorRef.current?.disconnect();
    audioContextRef.current?.close();

    streamRef.current?.getTracks().forEach(track => track.stop());

    socketRef.current?.close();
  };

  return (
    <div id="demo">
      <h2 className="styled-heading">Live Demo</h2>
      <div className="demo-header">
        <button onClick={startRecording} disabled={isRecording}>
          🎤 Start
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          ⏹️ Stop
        </button>
      </div>

      <p>Status: {status}</p>
      <h3>Transcription:</h3>
      <pre>{transcript}</pre>
    </div>
  );
};

export default Recorder;


