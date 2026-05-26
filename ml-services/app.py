# =============================================
# app.py — ML Prediction Server (Flask)
# Models: General Disease, Heart, Diabetes, Kidney
# =============================================

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# =============================================
# 1. LOAD RECOMMENDATION CSV
# =============================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "recommen.csv")

recommendation_df = pd.read_csv(csv_path)

recommendation_df.columns = recommendation_df.columns.str.strip()

recommendation_df["Disease"] = (
    recommendation_df["Disease"]
    .astype(str)
    .str.strip()
    .str.lower()
)

recommendation_df = recommendation_df.fillna("N/A")

print(recommendation_df["Disease"].unique())

# =============================================
# 2. LOAD TRAINED MODELS
# =============================================

# General Disease Model
with open("models/tfidf_vectorizer.pkl", "rb") as f:
    tfidf = pickle.load(f)

with open("models/general_model.pkl", "rb") as f:
    general_model = pickle.load(f)

# Heart Disease Model
with open("models/heart_model1.pkl", "rb") as f:
    heart_model = pickle.load(f)

# Diabetes Model
with open("models/diabetes_model1.pkl", "rb") as f:
    diabetes_model = pickle.load(f)

# Kidney Disease Model
with open("models/kidney_imputer.pkl", "rb") as f:
    kidney_imputer = pickle.load(f)

# sklearn compatibility fix
if not hasattr(kidney_imputer, "_fill_dtype"):
    kidney_imputer._fill_dtype = kidney_imputer._fit_dtype

with open("models/kidney_model.pkl", "rb") as f:
    kidney_model = pickle.load(f)

# =============================================
# 3. FEATURE MAPPINGS
# =============================================

# ---------- HEART ----------

gender_map_h = {
    "Male": 1,
    "Female": 0
}

yes_no_map_h = {
    "Yes": 1,
    "No": 0
}

smoker_map_h = {
    "Never": 0,
    "Former": 1,
    "Current": 2
}

health_map_h = {
    "Excellent": 4,
    "Very Good": 3,
    "Good": 2,
    "Fair": 1,
    "Poor": 0
}

age_map_h = {
    "18-24": 1,
    "25-29": 2,
    "30-34": 3,
    "35-39": 4,
    "40-44": 5,
    "45-49": 6,
    "50-54": 7,
    "55-59": 8,
    "60-64": 9,
    "65-69": 10,
    "70-74": 11,
    "75-79": 12,
    "80+": 13
}

# ---------- DIABETES ----------

yes_no_map_d = {
    "Yes": 1,
    "No": 0
}

gender_map_d = {
    "Male": 1,
    "Female": 0
}

health_map_d = {
    "Excellent": 5,
    "Very Good": 4,
    "Good": 3,
    "Fair": 2,
    "Poor": 1
}

age_map_d = {
    "18-24": 1,
    "25-29": 2,
    "30-34": 3,
    "35-39": 4,
    "40-44": 5,
    "45-49": 6,
    "50-54": 7,
    "55-59": 8,
    "60-64": 9,
    "65-69": 10,
    "70-74": 11,
    "75-79": 12,
    "80+": 13
}

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
# 4. HELPER FUNCTIONS
# =============================================

def convert_to_list(value):

    value = str(value).strip()

    if value == "" or value.lower() == "n/a":
        return []

    return [
        x.strip()
        for x in value.split(",")
        if x.strip()
    ]


def get_recommendations(disease_name: str) -> dict:

    disease_name = str(disease_name).strip().lower()

    recommendation_df["Disease_clean"] = (
        recommendation_df["Disease"]
        .astype(str)
        .str.strip()
        .str.lower()
    )

    rec = recommendation_df[
        recommendation_df["Disease_clean"] == disease_name
    ]

    if not rec.empty:

        row = rec.iloc[0]

        return {
            "localName": str(
                row.get("Local Name", "N/A")
            ).strip(),

            "firstAid": convert_to_list(
                row.get("First Aid", "N/A")
            ),

            "medicine": convert_to_list(
                row.get("Medicine", "N/A")
            ),

            "tests": convert_to_list(
                row.get("Lab_Test", "N/A")
            ),

            "specialist": str(
                row.get("Specialist", "General Physician")
            ).strip(),

            "diet": convert_to_list(
                row.get("Diet", "N/A")
            ),

            "exercise": convert_to_list(
                row.get("Exercise", "N/A")
            )
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


def get_risk_level(confidence: float) -> str:

    if confidence >= 70:
        return "High Risk"

    elif confidence >= 45:
        return "Moderate Risk"

    return "Low Risk"

# =============================================
# ROUTE 1 — GENERAL DISEASE PREDICTION
# =============================================

@app.route("/predict-general", methods=["POST"])
def predict_general():

    try:

        data = request.json
        text = data.get("text", "").strip()

        if not text or len(text) < 10:
            return jsonify({
                "error": "Please enter at least 10 characters"
            }), 400

        text_vector = tfidf.transform([text])

        prediction = general_model.predict(text_vector)[0]
        prediction = str(prediction).strip()

        proba = general_model.predict_proba(text_vector)[0]
        confidence = int(max(proba) * 100)

        risk = get_risk_level(confidence)

        recs = get_recommendations(prediction)

        return jsonify({
            "predictedDisease": prediction,
            "riskLevel": risk,
            "confidence": confidence,
            "recommendations": recs
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =============================================
# ROUTE 2 — HEART DISEASE PREDICTION
# =============================================

heart_features = [
    "Sex",
    "AgeCategory",
    "HeightInMeters",
    "WeightInKilograms",
    "BMI",
    "SmokerStatus",
    "AlcoholDrinkers",
    "PhysicalActivities",
    "SleepHours",
    "HadDiabetes",
    "HadAsthma",
    "HadKidneyDisease",
    "DifficultyWalking",
    "HadStroke"
]

@app.route("/predict-heart", methods=["POST"])
def predict_heart():

    try:

        data = request.json

        missing = [
            f for f in heart_features
            if f not in data
        ]

        if missing:

            return jsonify({
                "error": f"Missing features: {', '.join(missing)}"
            }), 400

        # =============================================
        # Convert categorical values into numeric
        # =============================================

        sex = gender_map_h.get(
            str(data["Sex"]).strip(),
            0
        )

        age = age_map_h.get(
            str(data["AgeCategory"]).strip(),
            1
        )

        smoker_raw = str(
            data["SmokerStatus"]
        ).strip().lower()

        if "never" in smoker_raw:
            smoker = 0

        elif "former" in smoker_raw:
            smoker = 1

        else:
            smoker = 2

        alcohol = yes_no_map_h.get(
            str(data["AlcoholDrinkers"]).strip(),
            0
        )

        physical = yes_no_map_h.get(
            str(data["PhysicalActivities"]).strip(),
            0
        )

        diabetes = yes_no_map_h.get(
            str(data["HadDiabetes"]).strip(),
            0
        )

        asthma = yes_no_map_h.get(
            str(data["HadAsthma"]).strip(),
            0
        )

        kidney = yes_no_map_h.get(
            str(data["HadKidneyDisease"]).strip(),
            0
        )

        walking = yes_no_map_h.get(
            str(data["DifficultyWalking"]).strip(),
            0
        )

        stroke = yes_no_map_h.get(
            str(data["HadStroke"]).strip(),
            0
        )

        # =============================================
        # Final dataframe for ML model
        # =============================================

        input_df = pd.DataFrame([{

            "Sex": sex,

            "AgeCategory": age,

            "HeightInMeters": float(
                data["HeightInMeters"]
            ),

            "WeightInKilograms": float(
                data["WeightInKilograms"]
            ),

            "BMI": float(
                data["BMI"]
            ),

            "SmokerStatus": smoker,

            "AlcoholDrinkers": alcohol,

            "PhysicalActivities": physical,

            "SleepHours": float(
                data["SleepHours"]
            ),

            "HadDiabetes": diabetes,

            "HadAsthma": asthma,

            "HadKidneyDisease": kidney,

            "DifficultyWalking": walking,

            "HadStroke": stroke

        }])

        proba_all = heart_model.predict_proba(
            input_df
        )[0]

        proba = proba_all[1]

        prediction = 1 if proba > 0.08 else 0

        confidence = int(proba * 100)

        if prediction == 1:

            recs = get_recommendations(
                "heart disease"
            )
            print(recs)

        else:

            recs = {
                "localName": "N/A",
                "firstAid": [],
                "medicine": [],
                "tests": [],
                "specialist": "General Physician",
                "diet": [],
                "exercise": []
            }

        return jsonify({

            "predictedDisease": (
                "Heart Disease"
                if prediction == 1
                else "No Heart Disease"
            ),

            "riskLevel": (
                "High Risk"
                if prediction == 1
                else "Low Risk"
            ),

            "confidence": confidence,

            "recommendations": recs

        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =============================================
# ROUTE 3 — DIABETES PREDICTION
# =============================================

diabetes_features = [
    "HighBP",
    "HighChol",
    "Stroke",
    "HeartDiseaseorAttack",
    "Smoker",
    "HvyAlcoholConsump",
    "PhysActivity",
    "Fruits",
    "Veggies",
    "DiffWalk",
    "GenHlth",
    "BMI",
    "Sex",
    "Age"
]

binary_fields_d = [
    "HighBP",
    "HighChol",
    "Stroke",
    "HeartDiseaseorAttack",
    "Smoker",
    "HvyAlcoholConsump",
    "PhysActivity",
    "Fruits",
    "Veggies",
    "DiffWalk"
]

@app.route("/predict-diabetes", methods=["POST"])
def predict_diabetes():

    try:

        data = request.json

        missing = [
            f for f in diabetes_features
            if f not in data
        ]

        if missing:
            return jsonify({
                "error": f"Missing features: {', '.join(missing)}"
            }), 400

        input_data = []

        for f in diabetes_features:

            val = data[f]

            if f in binary_fields_d:

                val = yes_no_map_d.get(
                    str(val).strip().capitalize(),
                    0
                )

            elif f == "Sex":

                val = gender_map_d.get(
                    str(val).strip().capitalize(),
                    0
                )

            elif f == "GenHlth":

                val = health_map_d.get(
                    str(val).strip().title(),
                    3
                )

            elif f == "Age":

                val = age_map_d.get(
                    str(val).strip(),
                    7
                )

            elif f == "Education":

                val = education_map_d.get(
                    str(val).strip(),
                    4
                )

            elif f == "Income":

                val = income_map_d.get(
                    str(val).strip(),
                    5
                )

            else:

                try:
                    val = float(val)

                except:
                    val = 0.0

            input_data.append(val)

        X = np.array(input_data).reshape(1, -1)

        prediction = diabetes_model.predict(X)[0]

        proba = (
            diabetes_model.predict_proba(X)[0][1]
            if hasattr(diabetes_model, "predict_proba")
            else None
        )

        if proba is not None:

            if proba >= 0.66:
                risk = "High Risk"

            elif proba >= 0.33:
                risk = "Moderate Risk"

            else:
                risk = "Low Risk"

            confidence = round(proba * 100, 2)

        else:

            risk = (
                "High Risk"
                if prediction == 1
                else "Low Risk"
            )

            confidence = None

        recs = get_recommendations("diabetes")

        return jsonify({
            "prediction": int(prediction),

            "predictedDisease": (
                "Diabetes"
                if prediction == 1
                else "No Diabetes"
            ),

            "riskLevel": risk,
            "confidence": confidence,
            "recommendations": recs
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# =============================================
# ROUTE 4 — KIDNEY DISEASE PREDICTION
# =============================================

kidney_features = [
    "age",
    "bp",
    "sg",
    "al",
    "su",
    "bgr",
    "bu",
    "sc",
    "hemo",
    "htn",
    "dm",
    "appet"
]

@app.route("/predict-kidney", methods=["POST"])
def predict_kidney():

    try:

        data = request.json

        missing = [
            f for f in kidney_features
            if f not in data
        ]

        if missing:
            return jsonify({
                "error": f"Missing features: {', '.join(missing)}"
            }), 400

        input_df = pd.DataFrame([{
            "age": float(data["age"]),
            "bp": float(data["bp"]),
            "sg": float(data["sg"]),
            "al": float(data["al"]),
            "su": float(data["su"]),
            "bgr": float(data["bgr"]),
            "bu": float(data["bu"]),
            "sc": float(data["sc"]),
            "hemo": float(data["hemo"]),
            "htn": float(data["htn"]),
            "dm": float(data["dm"]),
            "appet": float(data["appet"])
        }])

        input_imputed = kidney_imputer.transform(input_df)

        prediction = kidney_model.predict(input_imputed)[0]

        proba = (
            kidney_model.predict_proba(input_imputed)[0]
            if hasattr(kidney_model, "predict_proba")
            else None
        )

        confidence = (
            int(max(proba) * 100)
            if proba is not None
            else 75
        )

        if proba is not None:

            pos_proba = proba[1]

            if pos_proba >= 0.66:
                risk = "High Risk"

            elif pos_proba >= 0.33:
                risk = "Moderate Risk"

            else:
                risk = "Low Risk"

        else:

            risk = (
                "High Risk"
                if prediction == 1
                else "Low Risk"
            )

        # =============================================
        # RECOMMENDATIONS FIX
        # =============================================

        if prediction == 1:

            disease_key = "kidney disease"

            recs = get_recommendations(
                disease_key
            )

            print("Kidney Recommendations:", recs)

        else:

            disease_key = "No Kidney Disease"

            recs = {
                "localName": "N/A",
                "firstAid": [],
                "medicine": [],
                "tests": [],
                "specialist": "Nephrologist",
                "diet": [],
                "exercise": []
            }

        return jsonify({
            "predictedDisease": disease_key,
            "riskLevel": risk,
            "confidence": confidence,
            "recommendations": recs
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =============================================
# SERVER START
# =============================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )