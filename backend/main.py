from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import joblib
import numpy as np


app = FastAPI(
    title="AI Predictive Maintenance API"
)


# CORS connection React + FastAPI

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)



# Load ML files

model = joblib.load("model.pkl")

scaler = joblib.load("scaler.pkl")





class MachineData(BaseModel):

    air_temperature: float

    process_temperature: float

    rotational_speed: float

    torque: float

    tool_wear: int





@app.get("/")

def home():

    return {

        "message":
        "Industrial AI Predictive Maintenance API Running"

    }







@app.post("/predict")

def predict(data: MachineData):


    values = np.array(
        [
            [
                data.air_temperature,

                data.process_temperature,

                data.rotational_speed,

                data.torque,

                data.tool_wear

            ]
        ]
    )


    values = scaler.transform(values)


    prediction = model.predict(values)[0]


    probability = (
        model.predict_proba(values)[0][1]
        *
        100
    )


    if prediction == 1:

        status = "Failure"

        recommendation = (
            "High machine stress detected. "
            "Schedule preventive maintenance."
        )


    else:

        status = "Healthy"

        recommendation = (
            "Machine condition is normal. "
            "Continue monitoring."
        )



    return {

        "prediction":status,

        "probability":round(probability,2),

        "recommendation":recommendation

    }