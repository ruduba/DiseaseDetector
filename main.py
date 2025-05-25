from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict-heart', methods=['GET', 'POST'])
def predict_heart():
    if request.method == 'GET':
        return "This endpoint only accepts POST requests with heart health data in JSON format."

    data = request.get_json()
    # Perform your ML prediction using `data`...
    result = "High risk"  # example
    confidence = 0.91  # example

    return jsonify({"result": result, "confidence": confidence})

if __name__ == '__main__':
    app.run(debug=True)
