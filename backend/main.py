import tempfile
import whisper
from starlette.responses import JSONResponse
# from models import Note
from fastapi import FastAPI,WebSocket
# from database import SessionLocal, Base, engine





# Base.metadata.create_all(bind=engine)

app = FastAPI()


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# Load the Whisper model once to optimize performance
model = whisper.load_model("base")  # Options: "tiny", "base", "small", "medium", "large"
#CUDA speeds up the process massively (if your system supports it).


@app.websocket("/ws")
async def websocket_endpoint(websocket:WebSocket):
    await websocket.accept()
    while True:
        data=await websocket.receive_bytes()
        with tempfile.NamedTemporaryFile(suffix=".mp3") as temp_audio:
            temp_audio.write(data)
            temp_audio.flush()
            result = model.transcribe(temp_audio.name)
            await websocket.send_text(result["text"])














