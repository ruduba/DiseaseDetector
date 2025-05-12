import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Example dataset: Replace this with your actual dataset for heart disease prediction
# For demonstration, using a dummy dataset

# Example columns that your dataset might have (adjust if needed)
data = {
    'age': [29, 45, 35, 50, 61, 30, 39, 45],
    'sex': [1, 0, 1, 1, 0, 0, 1, 0],
    'cp': [1, 3, 2, 1, 3, 1, 2, 1],
    'trestbps': [120, 150, 130, 140, 160, 125, 135, 145],
    'chol': [200, 240, 230, 250, 300, 180, 220, 280],
    'fbs': [0, 1, 0, 1, 1, 0, 0, 1],
    'restecg': [0, 1, 0, 0, 1, 1, 0, 1],
    'thalach': [150, 130, 140, 120, 110, 140, 145, 155],
    'exang': [0, 1, 0, 1, 0, 0, 1, 0],
    'oldpeak': [1.2, 2.3, 1.4, 2.2, 1.1, 1.5, 1.8, 1.3],
    'slope': [1, 2, 1, 3, 2, 1, 1, 3],
    'ca': [0, 1, 0, 1, 1, 0, 0, 1],
    'thal': [2, 3, 2, 3, 2, 3, 3, 2],
    'target': [0, 1, 0, 1, 1, 0, 1, 1]  # Example target (0 = no heart disease, 1 = heart disease)
}

# Create a DataFrame
df = pd.DataFrame(data)

# Split the data into features and target
X = df.drop('target', axis=1)
y = df['target']

# Split the dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Create and train a RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Check accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the model
joblib.dump(model, 'models/heart_model.pkl')
print("Model saved as heart_model.pkl")
