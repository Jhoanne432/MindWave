from fastapi import FastAPI, Request
from pydantic import BaseModel
import numpy as np
import tensorflow as tf

# Load model
model = tf.keras.models.load_model("MFI_MODEL.keras")

# Input schema
class PredictionInput(BaseModel):
    data: list  # list of 4 feature arrays (each [10][1])

app = FastAPI()

@app.post("/predict")
async def predict(input: PredictionInput):
    try:
        # Prepare input shape: list of 4 numpy arrays, shape (1, 10, 1)
        formatted_input = [
            np.array([feat], dtype=np.float32) for feat in input.data
        ]

        probs = model.predict(formatted_input)[0]  # (3,)
        prediction = int(np.argmax(probs))
        labels = ['Low', 'Med', 'High']
        return {
            "prediction": labels[prediction],
            "probabilities": probs.tolist()
        }

    except Exception as e:
        return {"error": str(e)}
