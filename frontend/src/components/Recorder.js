import React, { useState, useRef } from 'react';
import './recorder.css';

const Recorder = () => {
  const [status, setStatus] = useState('Click "Start" to begin.');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const workletRef = useRef(null);
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

      await audioContext.audioWorklet.addModule(process.env.PUBLIC_URL + '/processor.js');

      const source = audioContext.createMediaStreamSource(stream);
      const workletNode = new AudioWorkletNode(audioContext, 'my-processor');
      workletRef.current = workletNode;

      workletNode.port.onmessage = (event) => {
        const buffer = event.data;
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(buffer.buffer);
        }
      };

      source.connect(workletNode);
      workletNode.connect(audioContext.destination); // Optional
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

    workletRef.current?.disconnect();
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



