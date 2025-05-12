from flask import Flask
from flask_cors import CORS
from routes.predict_heart import heart_bp
from routes.predict_diabetes import diabetes_bp  # ✅ Import diabetes blueprint

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(heart_bp)
app.register_blueprint(diabetes_bp)  # ✅ Register here

if __name__ == '__main__':
    app.run(debug=True)
