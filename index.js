const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const status = document.getElementById('status');
const resultPara = document.getElementById('transcriptionResult');

let mediaRecorder;
let chunks = [];
let socket;

startBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  chunks = [];

  socket = new WebSocket('ws://127.0.0.1:8000/ws');

  socket.onopen = () => {
    status.textContent = "WebSocket connected. Recording...";
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  socket.onmessage = (event) => {
    resultPara.textContent = event.data;
    status.textContent = "Transcription received!";
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
    status.textContent = "WebSocket error.";
  };

  mediaRecorder.ondataavailable = e => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });

    // Convert to ArrayBuffer and send raw bytes
    blob.arrayBuffer().then(arrayBuffer => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(arrayBuffer);
      } else {
        status.textContent = "WebSocket not open.";
      }
    });

    stopBtn.disabled = true;
    startBtn.disabled = false;
    status.textContent = "Uploading for transcription...";
  };
});

stopBtn.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    status.textContent = "Stopping recording...";
  }
});