import {
  generalPrediction,
  heartDiseasePrediction,
  diabetesPrediction,
  kidneyPrediction
} from "../models/disease.models.js";

/**
 * @description getPredictionHistory
 */
export const getPredictionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const general = await generalPrediction.find({ userId });
    const heart = await heartDiseasePrediction.find({ userId });
    const diabetes = await diabetesPrediction.find({ userId });
    const kidney = await kidneyPrediction.find({ userId });

    let result = [];

    // ================= GENERAL =================
    general.forEach((item) => {
      result.push({
        type: "general",
        disease: item.predictedDisease,
        risk: item.riskLevel,
        confidence: item.confidence || 0,

        diet: item.recommendations?.diet || [],
        exercise: item.recommendations?.exercise || [],
        tests: item.recommendations?.tests || [],
        specialist: item.recommendations?.specialist || "General Physician",

        date: item.createdAt,
      });
    });

    // ================= HEART =================
    heart.forEach((item) => {
      result.push({
        type: "heart",
        disease: item.Prediction,
        risk: item.RiskLevel,
        confidence: item.Confidence || 0,

        diet: item.recommendations?.diet || [],
        exercise: item.recommendations?.exercise || [],
        tests: item.recommendations?.tests || [],
        specialist: item.recommendations?.specialist || "Cardiologist",

        date: item.createdAt,
      });
    });

    // ================= DIABETES =================
    diabetes.forEach((item) => {
      result.push({
        type: "diabetes",
        disease: item.Prediction,
        risk: item.RiskLevel,
        confidence: item.Confidence || 0,

        diet: item.recommendations?.diet || [],
        exercise: item.recommendations?.exercise || [],
        tests: item.recommendations?.tests || [],
        specialist: item.recommendations?.specialist || "Endocrinologist",

        date: item.createdAt,
      });
    });

    // ================= KIDNEY =================
    kidney.forEach((item) => {
      result.push({
        type: "kidney",
        disease: item.Prediction,
        risk: item.RiskLevel,
        confidence: item.Confidence || 0,

        diet: item.recommendations?.diet || [],
        exercise: item.recommendations?.exercise || [],
        tests: item.recommendations?.tests || [],
        specialist: item.recommendations?.specialist || "Nephrologist",

        date: item.createdAt,
      });
    });

    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.json(result);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};