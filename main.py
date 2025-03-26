import tempfile
import whisper
from fastapi import FastAPI, UploadFile, File, HTTPException
from database import SessionLocal
from models import Transcription
from fastapi import Depends

from fastapi.responses import HTMLResponse





app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load the Whisper model once to optimize performance
model = whisper.load_model("base").to("cuda")  # Options: "tiny", "base", "small", "medium", "large"
#CUDA speeds up the process massively (if your system supports it).

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # Save uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_mp3:
            temp_mp3.write(file.file.read())
            temp_mp3_path = temp_mp3.name  # Save temp file path

        # Transcribe using Whisper
        result = model.transcribe(temp_mp3_path)
        text = result["text"]

        # Save transcription to the database
        db = SessionLocal()
        transcription = Transcription(text=text)
        db.add(transcription)
        db.commit()
        db.refresh(transcription)
        db.close()

        return {"transcription": text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# @app.get("/transcription/{id}")
# def get_transcription(id: int, db: Session = Depends(get_db)):
#     # Query to fetch only the 'text' field for the given ID
#     transcription = db.query(Transcription.text).filter(Transcription.id == id).first()
#
#     if transcription is None:
#         raise HTTPException(status_code=404, detail="Transcription not found")
#
#     return {"transcription": transcription[0]}




