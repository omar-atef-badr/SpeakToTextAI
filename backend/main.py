<<<<<<< HEAD
import os
=======
>>>>>>> 6047596538affe6405906ab15634d972934612c9
import tempfile
import whisper
from starlette.responses import JSONResponse
# from models import Note
from fastapi import FastAPI,WebSocket
<<<<<<< HEAD
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
=======
# from database import SessionLocal, Base, engine


>>>>>>> 6047596538affe6405906ab15634d972934612c9



# Base.metadata.create_all(bind=engine)

app = FastAPI()
<<<<<<< HEAD
app.mount("/static", StaticFiles(directory="backend/build/static"), name="static")


=======


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

>>>>>>> 6047596538affe6405906ab15634d972934612c9
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


<<<<<<< HEAD
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    index_path = os.path.join("backend", "build", "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"detail": "React build not found"}
=======












>>>>>>> 6047596538affe6405906ab15634d972934612c9
