import axios from "axios"
import {diabetesPrediction, generalPrediction, heartDiseasePrediction, kidneyPrediction } from "../models/disease.models.js";

const mlServer="https://health-prediction-and-recommendation-35bk.onrender.com"

/**
 * @desc Predict general disease based on user symptoms
 * @route POST /api/general-desease
 * @access Public
 */
export const predictGeneralDesease=async (req,res)=>{
    try {
        const userId = req.user?.id || null;
        const { text } = req.body;
        
        if(!text||text.length<10){
           return res.status(400).json({
            message:"Please enter at least 10 charactes"
           })
        }

        /**
         * @description API call to ML server
         */

        const AI_response=await axios.post(mlServer+"/predict-general",
            {text}
        );

        const {predictedDisease,riskLevel,localName,confidence,recommendations}=AI_response.data

        /**
         * @description to save data in mongoodb
         */
        const result=await generalPrediction.create({
            userId,
            inputSymptoms:text,
            predictedDisease,
            localName,
            riskLevel,
            confidence,
            recommendations
        })

        /**
         * @description return result to frontend
         */
        res.status(200).json(AI_response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Server error in general disease prediction"
        })
    }
}

/**
 * @desc Predict heart disease risk (Test mode, no auth)
 * @route POST /api/heart-disease
 * @access Public (for testing)
 */
export const predictHeartDisease = async (req, res) => {

  try {
    const userId = req.user?.id || null;
    const {
      Sex,
      AgeCategory,
      HeightInMeters,
      WeightInKilograms,
      BMI,
      SmokerStatus,
      AlcoholDrinkers,
      PhysicalActivities,
      SleepHours,
      HadStroke,
      HadDiabetes,
      DifficultyWalking,
      HadAsthma,
      HadKidneyDisease
    } = req.body;


    /**
     * required fields
     */
    if (
      !Sex ||
      !AgeCategory ||
      !HeightInMeters ||
      !WeightInKilograms ||
      !BMI
    ) {

      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    /**
     * Call ML Server
     */
    const AI_response = await axios.post(
      mlServer + "/predict-heart",
      {
        Sex,
        AgeCategory,
        HeightInMeters,
        WeightInKilograms,
        BMI,
        SmokerStatus,
        AlcoholDrinkers,
        PhysicalActivities,
        SleepHours,
        HadStroke,
        HadDiabetes,
        DifficultyWalking,
        HadAsthma,
        HadKidneyDisease
      }
    );

    const {
      predictedDisease,
      riskLevel,
      confidence,
      recommendations
    } = AI_response.data;

    /**
     * Save in MongoDB
     */
    const result = await heartDiseasePrediction.create({

      userId,

      Sex,
      AgeCategory,
      HeightInMeters,
      WeightInKilograms,
      BMI,
      SmokerStatus,
      AlcoholDrinkers,
      PhysicalActivities,
      SleepHours,
      HadStroke,
      HadDiabetes,
      DifficultyWalking,
      HadAsthma,
      HadKidneyDisease,

      Prediction: predictedDisease,
      RiskLevel: riskLevel,
      Confidence: confidence,
      recommendations
    });

    /**
     * Return result
     */
    res.status(200).json(AI_response.data);

  } catch (error) {

    console.error(
      "Heart disease prediction error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: `Server error in heart disease prediction ${error.message}`,
      error:error
    });
  }
};

/**
 * @desc Predict diabetes risk (Test mode, no auth)
 * @route POST /api/diabetes
 * @access Public (for testing)
 */
export const predictDiabetesDisease = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const {
      HighBP,
      HighChol,
      CholCheck,
      BMI,
      Smoker,
      Stroke,
      HeartDiseaseorAttack,
      PhysActivity,
      Fruits,
      Veggies,
      HvyAlcoholConsump,
      AnyHealthcare,
      NoDocbcCost,
      GenHlth,
      MentHlth,
      PhysHlth,
      DiffWalk,
      Sex,
      Age
    } = req.body;

    // required basic validation
    if (!BMI || !Sex || !Age) {
      return res.status(400).json({
        message: "Missing required fields (BMI, Sex, Age)"
      });
    }

    /**
     * @description Call to ML server
     */
    const AI_response = await axios.post(mlServer + "/predict-diabetes", {
      HighBP,
      HighChol,
      CholCheck,
      BMI,
      Smoker,
      Stroke,
      HeartDiseaseorAttack,
      PhysActivity,
      Fruits,
      Veggies,
      HvyAlcoholConsump,
      AnyHealthcare,
      NoDocbcCost,
      GenHlth,
      MentHlth,
      PhysHlth,
      DiffWalk,
      Sex,
      Age
    });

    const { predictedDisease, riskLevel, confidence, recommendations } = AI_response.data;

    /**
     * @description Save prediction in MongoDB
     */
    const result = await diabetesPrediction.create({
      userId,
      HighBP,
      HighChol,
      CholCheck,
      BMI,
      Smoker,
      Stroke,
      HeartDiseaseorAttack,
      PhysActivity,
      Fruits,
      Veggies,
      HvyAlcoholConsump,
      AnyHealthcare,
      NoDocbcCost,
      GenHlth,
      MentHlth,
      PhysHlth,
      DiffWalk,
      Sex,
      Age,
      Prediction: predictedDisease,
      RiskLevel: riskLevel,
      Confidence: confidence,
      recommendations
    });

    /**
     * @description return result to frontend
     */
    res.status(200).json(AI_response.data);

  } catch (error) {
    console.error("Diabetes prediction error:", error);
    res.status(500).json({
      message: "Server error in diabetes prediction"
    });
  }
};

/**
 * @desc Predict kidney disease risk
 * @route POST /api/kidney-disease
 * @access Public (for testing)
 */
export const predictKidneyDisease = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    let {
      age,
      bp,
      sg,
      al,
      su,
      bgr,
      bu,
      sc,
      hemo,
      htn,
      dm,
      appet
    } = req.body;

    if (
      age === undefined ||
      bp === undefined ||
      sg === undefined ||
      al === undefined ||
      su === undefined ||
      bgr === undefined ||
      bu === undefined ||
      sc === undefined ||
      hemo === undefined ||
      htn === undefined ||
      dm === undefined ||
      appet === undefined
    ) {
      return res.status(400).json({
        message: "Missing required fields for kidney disease prediction"
      });
    }

    /**
     * @description Convert numeric values to schema enums
     */
    const htnValue = htn == 1 ? "Yes" : "No";
    const dmValue = dm == 1 ? "Yes" : "No";
    const appetValue = appet == 1 ? "Good" : "Poor";

    /**
     * @description Call ML server
     */
    const AI_response = await axios.post(mlServer + "/predict-kidney", {
      age,
      bp,
      sg,
      al,
      su,
      bgr,
      bu,
      sc,
      hemo,
      htn,
      dm,
      appet
    });

    const { predictedDisease, riskLevel, confidence, recommendations } =
      AI_response.data;

    /**
     * @description Save prediction in MongoDB
     */
    const result = await kidneyPrediction.create({
      userId,
      age,
      bp,
      sg,
      al,
      su,
      bgr,
      bu,
      sc,
      hemo,
      htn: htnValue,
      dm: dmValue,
      appet: appetValue,
      Prediction: predictedDisease,
      RiskLevel: riskLevel,
      Confidence: confidence,
      recommendations
    });

    /**
     * @description Send result to frontend
     */
    res.status(200).json(AI_response.data);

  } catch (error) {
    console.error("Kidney disease prediction error:", error);

    res.status(500).json({
      message: "Server error in kidney disease prediction"
    });
  }
};
