import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Sample dataset from UCI Pima Indians Diabetes Dataset
url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"

# Column names as per dataset documentation
columns = [
    'pregnancies', 'glucose', 'bp', 'skinthickness',
    'insulin', 'bmi', 'diabetes_pedigree_fn', 'age', 'outcome'
]

# Load dataset
df = pd.read_csv(url, names=columns)

# Split into features and target
X = df.drop('outcome', axis=1)
y = df['outcome']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Check accuracy
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Ensure models directory exists
os.makedirs('models', exist_ok=True)

# Save the model
joblib.dump(model, 'models/diabetes_model.pkl')
print("Model saved as 'models/diabetes_model.pkl'")
