import tempfile
import whisper
from starlette.responses import JSONResponse
# from models import Note
from fastapi import FastAPI, UploadFile, File, HTTPException,WebSocket
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





# @app.post("/transcribe/")
# async def transcribe_audio(file: UploadFile = File(...)):
#     try:
#         # Save uploaded file to a temporary location
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_mp3:
#             temp_mp3.write(await file.read())
#             temp_mp3_path = temp_mp3.name  # Save temp file path
#
#         # Transcribe using Whisper
#         result = model.transcribe(temp_mp3_path)
#         text = result["text"]
#
#
#         #Save transcription to the database
#         # db = SessionLocal()
#         # transcription = Note(title=file.filename, content=text)
#         # db.add(transcription)
#         # db.commit()
#         # db.refresh(transcription)
#         # db.close()
#
#         #return {"transcription": text}
#         return JSONResponse(content={"transcription": text})
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))








