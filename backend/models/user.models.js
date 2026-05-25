import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: function () {
      return this.authType === "local";
    }
  },

  authType: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },

  role: {
    type: String,
    enum: ["user", "doctor", "admin"],
    default: "user"
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
      return this.role === "doctor"
        ? "pending"
        : "approved";
    }
  },

  photo: {
    type: String
  },

  age: {
    type: Number,
    default: null
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: null
  },

  contact: {
    type: String,
    default: ""
  },


  specialization: {
    type: String,
    default: ""
  },

  experience: {
    type: Number,
    default: 0
  },

  hospital: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  fees: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

export default userModel;