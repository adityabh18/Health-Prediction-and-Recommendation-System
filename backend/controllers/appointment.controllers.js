import appointmentModel from "../models/appointment.models.js";

/**
 * @description BookAppointment
 */
export const bookAppointment = async (req, res) => {
  try {
    console.log("BOOK API HIT");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);
    const { doctorId, date, time, reason } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({
        message: "Doctor, date and time are required",
      });
    }

    const appointment = await appointmentModel.create({
      userId: req.user.id,
      doctorId,
      date,
      time,
      reason,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to book appointment",
    });
  }
};

/**
 * @description getUserAppointments
 */
export const getUserAppointments = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("USER ID:", req.user?.id);
    const appointments = await appointmentModel
      .find({ userId: req.user.id })
      .populate("doctorId", "username specialization photo");

    return res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get appointments",
    });
  }
};

/**
 * @description getDoctorAppointments
 */
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ doctorId: req.user.id })
      .populate("userId", "username email photo");

    return res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get doctor appointments",
    });
  }
};

/**
 * @description updateAppointmentStatus
 */
export const updateAppointmentStatus = async (req, res) => {
  try {
    console.log("UPDATE HIT");
    console.log("USER:", req.user);
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    return res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update appointment",
    });
  }
};

/**
 * @description getUserConsultations
 */
export const getUserConsultations = async (req, res) => {
  try {
    const userId = req.user.id;

    const consultations = await appointmentModel
      .find({ userId })
      .populate("doctorId", "username specialization image email")
      .sort({ createdAt: -1 });

    const uniqueDoctors = await appointmentModel.distinct("doctorId", {
      userId,
    });

    const formattedData = consultations.map((item) => ({
      id: item._id,

      doctorName: item.doctorId?.username || "Doctor",

      specialization: item.doctorId?.specialization || "General Physician",

      doctorImage:
        item.doctorId?.image ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",

      doctorEmail: item.doctorId?.email || "",

      date: item.date,

      time: item.time,

      reason: item.reason || "Not Provided",

      status: item.status,
    }));

    return res.status(200).json({
      success: true,
      totalDoctorsConsulted: uniqueDoctors.length,
      consultations: formattedData,
    });
  } catch (error) {
    console.log("Consultation History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch consultation history",
    });
  }
};
