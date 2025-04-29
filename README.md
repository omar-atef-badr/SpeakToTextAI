# TalkToTexty (originally was SpeakToTextAI)

A real-time speech-to-text web application powered by AI.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

TalkToTexty is a real-time speech-to-text application leveraging state-of-the-art AI models. This project uses OpenAI Whisper for speech recognition and provides a simple, responsive web interface built with React.

## Features

- Real-time speech-to-text conversion.
- Responsive web interface supported on various devices.
- Powered by OpenAI Whisper for accurate transcription.

## Getting Started

Follow these steps to set up the application locally.

### Prerequisites

Ensure you have the following installed:
- Node.js (https://nodejs.org/)
- Python 3.x (https://www.python.org/)
- pip (Python package manager)
- ffmpeg (required for audio processing)

### Frontend Setup

1. **Create a React App**:
    ```bash
    npx create-react-app my-app
    cd my-app
    ```

2. **Start the Development Server**:
    ```bash
    npm start
    ```

3. **Install Required Dependencies**:
    ```bash
    npm install react-bootstrap bootstrap
    npm install react-bootstrap-icons --save
    npm install animate.css --save
    npm i react-on-screen
    npm install axios
    ```

### Backend Setup

1. **Install Python Dependencies**:
    ```bash
    pip install fastapi uvicorn openai-whisper pydub websockets
    ```

    If the above command doesn't work, use the alternative mirror:
    ```bash
    pip install fastapi uvicorn openai-whisper -i https://pypi.org/simple
    ```

2. **Install ffmpeg**:
    ```bash
    sudo apt-get update
    sudo apt-get install ffmpeg
    ```

3. **Run the Backend Server**:
    Use `uvicorn` to run your FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

    Replace `main:app` with the entry point of your FastAPI application.

### Full System Integration

Once both the frontend and backend are running:
- Access the React frontend at `http://localhost:3000`.
- Ensure the backend API is accessible (e.g., `http://localhost:8000`).

## Technologies Used

- **Frontend**: React, Bootstrap, Animate.css
- **Backend**: FastAPI, OpenAI Whisper
- **Other Tools**: ffmpeg, pydub

## Contributing

We welcome contributions! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.
