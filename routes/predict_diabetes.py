from flask import Blueprint, request, jsonify
import joblib
import numpy as np

diabetes_bp = Blueprint('diabetes_bp', __name__)

# Load the diabetes model
model_path = 'models/diabetes_model.pkl'
model = joblib.load(model_path)

@diabetes_bp.route('/predict-diabetes', methods=['POST'])
def predict_diabetes():
    data = request.get_json()

    # Extract input features from JSON
    try:
        features = [
            data['pregnancies'],
            data['glucose'],
            data['bp'],
            data['skinthickness'],
            data['insulin'],
            data['bmi'],
            data['diabetes_pedigree_fn'],
            data['age']
        ]

        # Convert to NumPy array and reshape for prediction
        input_array = np.array(features).reshape(1, -1)

        # Make prediction (assuming binary classification: 0 or 1)
        prediction = model.predict(input_array)[0]

        return jsonify({
            'success': True,
            'prediction': int(prediction)
        })

    except KeyError as e:
        return jsonify({
            'success': False,
            'error': f'Missing key: {e}'
        }), 400

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    print("📥 Received JSON data:", data)  # ADD THIS LINE

    required_fields = ['pregnancies', 'glucose', 'bp', 'skin_thickness', 'insulin', 'bmi', 'dpf', 'age']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing fields'}), 400