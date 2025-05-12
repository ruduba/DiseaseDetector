from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import os
from routes.predict_diabetes import diabetes_bp


# Define the Blueprint
heart_bp = Blueprint('heart', __name__)

# Load the heart model
model_path = os.path.join("models", "heart_model.pkl")
model = joblib.load(model_path)

@heart_bp.route('/predict-heart', methods=['POST'])
def predict_heart():
    data = request.get_json()

    try:
        input_features = [
            data['age'],
            data['sex'],
            data['cp'],
            data['trestbps'],
            data['chol'],
            data['fbs'],
            data['restecg'],
            data['thalach'],
            data['exang'],
            data['oldpeak'],
            data['slope'],
            data['ca'],
            data['thal']
        ]

        prediction = model.predict([input_features])[0]
        confidence = model.predict_proba([input_features])[0][prediction] * 100

        return jsonify({
            "result": "yes" if prediction == 1 else "no",
            "confidence": round(confidence)
        })

    except KeyError as e:
        return jsonify({"error": f"Missing key: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


