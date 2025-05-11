from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("heart_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    # Convert list to numpy array for prediction
    input_data = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(input_data)
    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    app.run(port=5000)
