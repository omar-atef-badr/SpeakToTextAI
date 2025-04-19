# backend/main.py
import tempfile, whisper
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# ─── React build ─────────────────────────────────────────────────────────────
build_path = (Path(__file__).resolve().parent.parent / "frontend" / "build").resolve()
app.mount("/static", StaticFiles(directory=build_path / "static"), name="static")

@app.get("/{path:path}")
async def spa(path: str = ""):
    return FileResponse(build_path / "index.html")
# ─────────────────────────────────────────────────────────────────────────────

model = whisper.load_model("base")          # or "small"/"medium"/"large"

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(400, "Expected an audio file")

    with tempfile.NamedTemporaryFile(suffix=".webm") as tmp:
        tmp.write(await file.read())
        tmp.flush()
        text = model.transcribe(tmp.name)["text"]

    return {"text": text}



























