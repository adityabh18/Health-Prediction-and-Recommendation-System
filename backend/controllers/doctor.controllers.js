import appointmentModels from "../models/appointment.models.js";
import { diabetesPrediction, generalPrediction, heartDiseasePrediction, kidneyPrediction } from "../models/disease.models.js";
import userModel from "../models/user.models.js";

/**
 * @description getDoctorDashboardStats
 */
export const getDoctorDashboardStats = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const patients = await appointmentModels.distinct("userId", {
      doctorId,
    });

    const totalPatients = patients.length;

    const [g, h, d, k] = await Promise.all([
      generalPrediction.countDocuments({
        userId: { $in: patients },
        riskLevel: "High Risk",
      }),

      heartDiseasePrediction.countDocuments({
        userId: { $in: patients },
        RiskLevel: "High Risk",
      }),

      diabetesPrediction.countDocuments({
        userId: { $in: patients },
        RiskLevel: "High Risk",
      }),

      kidneyPrediction.countDocuments({
        userId: { $in: patients },
        RiskLevel: "High Risk",
      }),
    ]);

    const highRiskPatients = g + h + d + k;

    const todayAppointments = await appointmentModels.countDocuments({
      doctorId,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    });

    return res.status(200).json({
      success: true,
      totalPatients,
      highRiskPatients,
      todayAppointments,
    });

  } catch (error) {
    console.log("Dashboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/**
 * @description updateProfile
 */
export const updateProfile = async (req, res) => {
  try {

    const {
      username,
      age,
      gender,
      contact,
      specialization,
      experience,
      fees,
      location,
      hospital
    } = req.body;

    console.log(req.body);

    const updatedUser = await userModel.findByIdAndUpdate(

      req.user.id,

      {
        username,
        age,
        gender,
        contact,
        specialization,
        experience,
        fees,
        location,
        hospital
      },

      {
        returnDocument: "after"
      }

    ).select("-password");

    return res.status(200).json(updatedUser);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Profile update failed"
    });
  }
};


/**
 * @description getAllDoctors
 */

export const getAllDoctors = async (req, res) => {

  try {
    const doctors = await userModel.find({

      role: "doctor",

    }).select("-password");

    return res.status(200).json(doctors);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch doctors"
    });
  }
};

/**
 * @description getHighRiskPatients
 */
export const getHighRiskPatients = async (req, res) => {
  try {

    const doctorId = req.user.id;

    const appointments = await appointmentModels.find({
      doctorId,
    });

    const patientIds = appointments.map(
      (a) => a.userId
    );

    const heart = await heartDiseasePrediction.find({
      userId: { $in: patientIds },
      RiskLevel: "High Risk",
    }).populate("userId", "username");

    const diabetes = await diabetesPrediction.find({
      userId: { $in: patientIds },
      RiskLevel: "High Risk",
    }).populate("userId", "username");

    const kidney = await kidneyPrediction.find({
      userId: { $in: patientIds },
      RiskLevel: "High Risk",
    }).populate("userId", "username");

    const general = await generalPrediction.find({
      userId: { $in: patientIds },
      riskLevel: "High Risk",
    }).populate("userId", "username");

    const allPatients = [
      ...heart.map((p) => ({
        name: p.userId?.username,
        disease: "Heart Disease",
        risk: "High",
      })),

      ...diabetes.map((p) => ({
        name: p.userId?.username,
        disease: "Diabetes",
        risk: "High",
      })),

      ...kidney.map((p) => ({
        name: p.userId?.username,
        disease: "Kidney Disease",
        risk: "High",
      })),

      ...general.map((p) => ({
        name: p.userId?.username,
        disease: "General Disease",
        risk: "High",
      })),
    ];

    return res.status(200).json(allPatients);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch high risk patients",
    });
  }
};

/**
 * @description getDoctorPatients
 */
export const getDoctorPatients = async (req, res) => {
  try {

    const doctorId = req.user.id;

    const appointments = await appointmentModels.find({
      doctorId,
    }).populate("userId", "-password");

    const uniquePatients = [];

    const added = new Set();

    appointments.forEach((appt) => {

      const patient = appt.userId;

      if (
        patient &&
        !added.has(patient._id.toString())
      ) {

        added.add(patient._id.toString());

        uniquePatients.push(patient);
      }
    });

    return res.status(200).json(uniquePatients);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch patients",
    });
  }
};