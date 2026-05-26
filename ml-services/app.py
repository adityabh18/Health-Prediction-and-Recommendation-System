# =============================================
# app.py — ML Prediction Server (Flask)
# Models: General Disease, Heart, Diabetes, Kidney
# =============================================

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import gc   # ✅ ADDED (memory fix)

app = Flask(__name__)
CORS(app)

# =============================================
# ✅ LAZY LOADING CACHE (ADDED ONLY)
# =============================================

MODEL_CACHE = {}
DATA_CACHE = {}

def load_model(name, path):
    """Load model only when needed (FIX MEMORY ISSUE)"""
    if name not in MODEL_CACHE:
        with open(path, "rb") as f:
            MODEL_CACHE[name] = pickle.load(f)
    return MODEL_CACHE[name]


def load_recommendation():
    """Load CSV only once (FIX MEMORY ISSUE)"""
    if "rec_df" not in DATA_CACHE:
        df = pd.read_csv("recommen.csv")

        df.columns = df.columns.str.strip()

        df["Disease"] = (
            df["Disease"]
            .astype(str)
            .str.strip()
            .str.lower()
        )

        df = df.fillna("N/A")

        DATA_CACHE["rec_df"] = df

    return DATA_CACHE["rec_df"]


# =============================================
# 1. LOAD RECOMMENDATION CSV (CHANGED ONLY)
# =============================================

recommendation_df = load_recommendation()   # ✅ CHANGED

print(recommendation_df["Disease"].unique())


# =============================================
# 2. LOAD MODELS (NO CHANGE - JUST LAZY INSIDE ROUTES)
# =============================================

# REMOVE ONLY THIS PART LOADING (NOT DELETE LOGIC)
# OLD:
# with open(...) as f: model = pickle.load(f)

# NOW HANDLED INSIDE ROUTES USING load_model()


# =============================================
# 3. FEATURE MAPPINGS (UNCHANGED)
# =============================================

gender_map_h = {"Male": 1, "Female": 0}
yes_no_map_h = {"Yes": 1, "No": 0}
smoker_map_h = {"Never": 0, "Former": 1, "Current": 2}

health_map_h = {
    "Excellent": 4,
    "Very Good": 3,
    "Good": 2,
    "Fair": 1,
    "Poor": 0
}

age_map_h = {
    "18-24": 1, "25-29": 2, "30-34": 3, "35-39": 4,
    "40-44": 5, "45-49": 6, "50-54": 7, "55-59": 8,
    "60-64": 9, "65-69": 10, "70-74": 11, "75-79": 12, "80+": 13
}

yes_no_map_d = {"Yes": 1, "No": 0}

gender_map_d = {"Male": 1, "Female": 0}

health_map_d = {
    "Excellent": 5, "Very Good": 4, "Good": 3,
    "Fair": 2, "Poor": 1
}

age_map_d = age_map_h

education_map_d = {
    "Never attended school": 1,
    "Elementary": 2,
    "Some high school": 3,
    "High school graduate": 4,
    "Some college": 5,
    "College graduate": 6
}

income_map_d = {
    "Less than 10,000": 1,
    "10,000 to 15,000": 2,
    "15,000 to 20,000": 3,
    "20,000 to 25,000": 4,
    "25,000 to 35,000": 5,
    "35,000 to 50,000": 6,
    "50,000 to 75,000": 7,
    "75,000 or more": 8
}


# =============================================
# 4. HELPERS (ONLY RECOMMENDATION FIX)
# =============================================

def convert_to_list(value):
    value = str(value).strip()
    if value == "" or value.lower() == "n/a":
        return []
    return [x.strip() for x in value.split(",") if x.strip()]


def get_recommendations(disease_name: str):
    df = load_recommendation()   # ✅ CHANGED (lazy)

    disease_name = str(disease_name).strip().lower()

    rec = df[df["Disease"] == disease_name]

    if not rec.empty:
        row = rec.iloc[0]
        return {
            "localName": str(row.get("Local Name", "N/A")).strip(),
            "firstAid": convert_to_list(row.get("First Aid", "N/A")),
            "medicine": convert_to_list(row.get("Medicine", "N/A")),
            "tests": convert_to_list(row.get("Lab_Test", "N/A")),
            "specialist": str(row.get("Specialist", "General Physician")).strip(),
            "diet": convert_to_list(row.get("Diet", "N/A")),
            "exercise": convert_to_list(row.get("Exercise", "N/A"))
        }

    return {
        "localName": "N/A",
        "firstAid": [],
        "medicine": [],
        "tests": [],
        "specialist": "General Physician",
        "diet": [],
        "exercise": []
    }


def get_risk_level(confidence: float):
    if confidence >= 70:
        return "High Risk"
    elif confidence >= 45:
        return "Moderate Risk"
    return "Low Risk"


# =============================================
# ROUTE 1 - GENERAL (ONLY CHANGE = LAZY MODEL)
# =============================================

@app.route("/predict-general", methods=["POST"])
def predict_general():
    try:
        tfidf = load_model("tfidf", "models/tfidf_vectorizer.pkl")
        general_model = load_model("general", "models/general_model.pkl")

        data = request.json
        text = data.get("text", "").strip()

        if not text or len(text) < 10:
            return jsonify({"error": "Please enter at least 10 characters"}), 400

        vec = tfidf.transform([text])

        pred = general_model.predict(vec)[0]
        proba = general_model.predict_proba(vec)[0]

        confidence = int(max(proba) * 100)

        return jsonify({
            "predictedDisease": str(pred),
            "riskLevel": get_risk_level(confidence),
            "confidence": confidence,
            "recommendations": get_recommendations(pred)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =============================================
# ROUTE 2 - HEART (ONLY MODEL LOAD FIX)
# =============================================

@app.route("/predict-heart", methods=["POST"])
def predict_heart():
    try:
        heart_model = load_model("heart", "models/heart_model1.pkl")

        data = request.json

        input_df = pd.DataFrame([{
            "Sex": 1 if data["Sex"] == "Male" else 0,
            "AgeCategory": int(data["AgeCategory"]),
            "HeightInMeters": float(data["HeightInMeters"]),
            "WeightInKilograms": float(data["WeightInKilograms"]),
            "BMI": float(data["BMI"]),
            "SmokerStatus": 1,
            "AlcoholDrinkers": 1 if data["AlcoholDrinkers"] == "Yes" else 0,
            "PhysicalActivities": 1 if data["PhysicalActivities"] == "Yes" else 0,
            "SleepHours": float(data["SleepHours"]),
            "HadDiabetes": 1 if data["HadDiabetes"] == "Yes" else 0,
            "HadAsthma": 1 if data["HadAsthma"] == "Yes" else 0,
            "HadKidneyDisease": 1 if data["HadKidneyDisease"] == "Yes" else 0,
            "DifficultyWalking": 1 if data["DifficultyWalking"] == "Yes" else 0,
            "HadStroke": 1 if data["HadStroke"] == "Yes" else 0
        }])

        proba = heart_model.predict_proba(input_df)[0][1]
        pred = 1 if proba > 0.08 else 0

        gc.collect()  # ✅ MEMORY CLEANUP

        return jsonify({
            "predictedDisease": "Heart Disease" if pred else "No Heart Disease",
            "riskLevel": "High Risk" if pred else "Low Risk",
            "confidence": int(proba * 100),
            "recommendations": get_recommendations("heart disease") if pred else {}
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =============================================
# ROUTE 3 - DIABETES (ONLY MODEL FIX)
# =============================================

@app.route("/predict-diabetes", methods=["POST"])
def predict_diabetes():
    try:
        diabetes_model = load_model("diabetes", "models/diabetes_model1.pkl")

        data = request.json
        features = np.array([[float(v) for v in data.values()]]).reshape(1, -1)

        pred = diabetes_model.predict(features)[0]

        proba = (
            diabetes_model.predict_proba(features)[0][1]
            if hasattr(diabetes_model, "predict_proba")
            else None
        )

        confidence = round(proba * 100, 2) if proba else None

        return jsonify({
            "prediction": int(pred),
            "predictedDisease": "Diabetes" if pred else "No Diabetes",
            "riskLevel": get_risk_level(confidence or 0),
            "confidence": confidence,
            "recommendations": get_recommendations("diabetes")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =============================================
# ROUTE 4 - KIDNEY (ONLY MODEL FIX)
# =============================================

@app.route("/predict-kidney", methods=["POST"])
def predict_kidney():
    try:
        imputer = load_model("kidney_imp", "models/kidney_imputer.pkl")
        kidney_model = load_model("kidney", "models/kidney_model.pkl")

        data = request.json

        df = pd.DataFrame([{
            k: float(v) for k, v in data.items()
        }])

        X = imputer.transform(df)

        pred = kidney_model.predict(X)[0]
        proba = kidney_model.predict_proba(X)[0][1]

        gc.collect()  # ✅ MEMORY CLEANUP

        return jsonify({
            "predictedDisease": "Kidney Disease" if pred else "No Kidney Disease",
            "riskLevel": get_risk_level(proba * 100),
            "confidence": int(proba * 100),
            "recommendations": get_recommendations("kidney disease") if pred else {}
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =============================================
# SERVER START
# =============================================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)