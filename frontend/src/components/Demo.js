import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Demo = () => {
  const [status, setStatus] = useState('Ready to transcribe');
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [words, setWords] = useState([]);

  const socketRef = useRef(null);
  const audioContextRef = useRef(null);
  const workletRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Convert transcript to array of words for animation
    if (transcript) {
      const wordArray = transcript.trim().split(' ').filter(word => word);
      setWords(wordArray);
    }
  }, [transcript]);

  const startRecording = async () => {
    setTranscript('');
    setWords([]);
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
    <section className="demo" id="demo">
      <Container>
        <Row className="align-items-center">
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Speech-to-Text Demo</h2>
                  
                  <div className="demo-content">
                    <div className="status-indicator">
                      <div className={`status-dot ${isRecording ? 'recording' : ''}`}></div>
                      <span>{status}</span>
                    </div>
                    
                    <div className="controls-container">
                      <button 
                        className={`control-button start-button ${isRecording ? 'disabled' : ''}`} 
                        onClick={startRecording} 
                        disabled={isRecording}
                      >
                        <i className="mic-icon">🎤</i>
                        <span>Start Recording</span>
                      </button>
                      
                      <button 
                        className={`control-button stop-button ${!isRecording ? 'disabled' : ''}`} 
                        onClick={stopRecording} 
                        disabled={!isRecording}
                      >
                        <i className="stop-icon">⏹️</i>
                        <span>Stop Recording</span>
                      </button>
                    </div>
                    
                    <div className="transcript-container">
                      <h3 className="transcript-title">Transcription</h3>
                      <div className="transcript-content">
                        {words.map((word, index) => (
                          <span key={index} className="transcript-word" style={{animationDelay: `${index * 0.1}s`}}>
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
