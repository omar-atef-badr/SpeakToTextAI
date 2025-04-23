# backend/main.py
import tempfile, whisper
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket
from pydub import AudioSegment
import wave


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SAMPLE_RATE = 44100
SAMPLE_WIDTH = 2
CHANNELS = 1

# ─── React build ─────────────────────────────────────────────────────────────
# build_path = (Path(__file__).resolve().parent.parent / "frontend" / "build").resolve()
# app.mount("/static", StaticFiles(directory=build_path / "static"), name="static")
#
# @app.get("/{path:path}")
# async def spa(path: str = ""):
#     return FileResponse(build_path / "index.html")
# ─────────────────────────────────────────────────────────────────────────────

model = whisper.load_model("base")          # or "small"/"medium"/"large"

# @app.post("/transcribe")
# async def transcribe_audio(file: UploadFile = File(...)):
#     if not file.content_type.startswith("audio/"):
#         raise HTTPException(400, "Expected an audio file")
#
#     with tempfile.NamedTemporaryFile(suffix=".webm") as tmp:
#         tmp.write(await file.read())
#         tmp.flush()
#         text = model.transcribe(tmp.name)["text"]
#
#     return {"text": text}

@app.websocket("/ws/transcribe")
async def websocket_transcribe(websocket: WebSocket):
    await websocket.accept()
    audio_buffer = bytearray()

    try:
        while True:
            chunk = await websocket.receive_bytes()
            audio_buffer.extend(chunk)

            if len(audio_buffer) > SAMPLE_RATE * SAMPLE_WIDTH * 5:  # 5 sec
                with tempfile.NamedTemporaryFile(suffix=".wav") as tmp_wav:
                    with wave.open(tmp_wav.name, "wb") as wf:
                        wf.setnchannels(CHANNELS)
                        wf.setsampwidth(SAMPLE_WIDTH)
                        wf.setframerate(SAMPLE_RATE)
                        wf.writeframes(audio_buffer)

                    result = model.transcribe(tmp_wav.name)
                    await websocket.send_text(result["text"])

                audio_buffer = bytearray()

    except Exception as e:
        print("WebSocket error:", e)
        await websocket.close()


#whilst you are on video call perhaps capture audio??