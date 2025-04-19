import React, { useState, useRef } from 'react';
import './recorder.css';

const Recorder = () => {
  const [status, setStatus]          = useState('Click "Start" to begin.');
  const [transcript, setTranscript]  = useState('No transcription yet.');
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef        = useRef([]);

  /* ───── helpers ───── */
  const chooseMime = () =>
    MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';

  /* ───── start ───── */
  const startRecording = async () => {
    chunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: chooseMime() });

    mediaRecorder.ondataavailable = e =>
      e.data.size && chunksRef.current.push(e.data);

    mediaRecorder.start();                     // one long recording
    mediaRecorderRef.current = mediaRecorder;

    setIsRecording(true);
    setStatus('Recording…');
    setTranscript('No transcription yet.');
  };

  /* ───── stop & upload ───── */
 const stopRecording = () => {
  if (!isRecording) return;

  setIsRecording(false);
  setStatus('Stopping recorder…');

  /* wait for onstop to fire */
  mediaRecorderRef.current.onstop = () => {
    setStatus('Encoding & uploading…');

    const blob = new Blob(chunksRef.current, { type: chooseMime() });

    const form = new FormData();
    form.append('file', blob, 'audio.webm');

    fetch('/transcribe', { method: 'POST', body: form })
      .then(r => r.json())
      .then(({ text }) => {
        setTranscript(text || '[empty]');
        setStatus('Done!');
      })
      .catch(() => setStatus('Upload or server error'));
  };

  /* now actually stop (will trigger onstop above) */
  mediaRecorderRef.current.stop();
};


  /* ───── UI ───── */
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
