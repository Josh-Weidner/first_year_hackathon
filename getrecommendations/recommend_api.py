from pydantic import BaseModel
from Encoder import SurveyEncoder
import joblib
import pandas as pd
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

enc = joblib.load("encoder.pkl")
model = joblib.load("model.pkl")

# --- Define input schema ---
class StudentResponse(BaseModel):
    responses: dict  # {question_name: value}


@app.post("/recommend")
def recommend(student: StudentResponse):
    # Convert to DataFrame
    df = pd.DataFrame([student.responses])

    # Transform and predict
    vec = enc.transform(df)
    probs = model.predict_proba(vec)[0]
    majors = model.classes_

    # Rank recommendations
    ranked = sorted(zip(probs, majors), reverse=True)
    result = [{"major": m, "probability": float(p)} for p, m in ranked]

    return {"recommendations": result}
