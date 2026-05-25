import mongoose from "mongoose";

/**
 * @description general disease prediction schema
 */
const generalDiseaseSchema = new mongoose.Schema({
  userId: {                  // Optional: agar login system hai
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  inputSymptoms: {           // User ne kya likha
    type: String,
    required: true
  },
  detectedSymptoms: {        // Frontend me detect hua
    type: [String],
    default: []
  },
  predictedDisease: {        // ML model ka prediction
    type: String,
    required: true
  },
  localName: {      
    type: String,
    default: ""
  },
  riskLevel: {
    type: String,
    enum: ["Low Risk", "Moderate Risk", "High Risk"],
    required: true
  },
  confidence: {
    type: Number,           // e.g., 82
    min: 0,
    max: 100,
    required: true
  },
  recommendations: {        // Diet, Exercise, Tests, Specialist
    diet: {
      type: [String],
      default: []
    },
    exercise: {
      type: [String],
      default: []
    },
    tests: {
      type: [String],
      default: []
    },
    medicine:{
        type:[String],
        default:[]
    },
    specialist: {
      type: String,
      default: ""
    }
  }
}, { timestamps: true });

const generalPrediction = mongoose.model("generalPredictions", generalDiseaseSchema);

/**
 * @description heart disease schema
 */
const heartSchema = new mongoose.Schema({
  userId: {                  
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  Sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  AgeCategory: {
    type: String,
    enum: [
      "18-24","25-29","30-34","35-39","40-44","45-49",
      "50-54","55-59","60-64","65-69","70-74","75-79","80+"
    ],
    required: true
  },
  BMI: {
    type: Number,
    min: 10,
    max: 60,
    required: true
  },
  SmokerStatus: {
    type: String,
    enum: ["Never", "Former", "Current"],
    required: true
  },
  AlcoholDrinkers: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  PhysicalActivities: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  SleepHours: {
    type: Number,
    min: 0,
    max: 24,
    required: true
  },
  GeneralHealth: {
  type: String,
  enum: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
  required: false,
  default: "Good"
},
  HadStroke: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  HadDiabetes: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  DifficultyWalking: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  HadAsthma: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  HadDepressiveDisorder: {
  type: String,
  enum: ["Yes", "No"],
  required: false,
  default: "No"
},
  HadKidneyDisease: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  Prediction:{
    type: String, 
    required: true 
  },
  RiskLevel:{
    type: String, 
    required: true 
  },
  Confidence:{
    type: Number,
    required: true 
  },
  recommendations: {        
    diet: {
      type: [String],
      default: []
    },
    exercise: {
      type: [String],
      default: []
    },
    tests: {
      type: [String],
      default: []
    },
    medicine:{
        type: [String],
        default: []
    },
    specialist: {
      type: String,
      default: ""
    }
}
},{timestamps:true});

const heartDiseasePrediction=mongoose.model("heartDiseasePrediction",heartSchema)

/**
 * @description diabetese schema
 */

const diabetesSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  HighBP: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  HighChol: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  BMI: {
    type: Number,
    min: 10,
    max: 60,
    required: true
  },

  Smoker: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  Stroke: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  HeartDiseaseorAttack: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  PhysActivity: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  Fruits: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  Veggies: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  HvyAlcoholConsump: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  GenHlth: {
    type: String,
    enum: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    required: true
  },

  DiffWalk: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },

  Sex: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },

  Age: {
    type: String,
    enum: [
      "18-24",
      "25-29",
      "30-34",
      "35-39",
      "40-44",
      "45-49",
      "50-54",
      "55-59",
      "60-64",
      "65-69",
      "70-74",
      "75-79",
      "80+"
    ],
    required: true
  },

  Prediction: {
    type: String,
    required: true
  },

  RiskLevel: {
    type: String,
    required: true
  },

  Confidence: {
    type: Number,
    required: true
  },

  recommendations: {

    diet: {
      type: [String],
      default: []
    },

    exercise: {
      type: [String],
      default: []
    },

    tests: {
      type: [String],
      default: []
    },

    medicine: {
      type: [String],
      default: []
    },

    specialist: {
      type: String,
      default: ""
    }
  }

},
{
  timestamps: true
}
);

const diabetesPrediction = mongoose.model(
  "diabetesPrediction",
  diabetesSchema
);



/**
 * @description Kidney disease schema
 */
const kidneySchema = new mongoose.Schema({
  userId: {                  
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  age: {
    type: Number,
    min: 0,
    required: true
  },
  bp: {
    type: Number,
    min: 50,
    max: 200,
    required: true
  },
  sg: {   // specific gravity
    type: Number,
    min: 1.0,
    max: 1.05,
    required: true
  },
  al: {   // albumin
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  su: {   // sugar
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  bgr: {  // blood glucose random
    type: Number,
    required: true
  },
  bu: {   // blood urea
    type: Number,
    required: true
  },
  sc: {   // serum creatinine
    type: Number,
    required: true
  },
  hemo: { // hemoglobin
    type: Number,
    required: true
  },
  htn: {  // hypertension
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  dm: {   // diabetes mellitus
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  appet: { // appetite
    type: String,
    enum: ["Good", "Poor"],
    required: true
  },
  Prediction: {        
    type: String,
    required: true
  },
  RiskLevel: {        
    type: String,
    required: true
  },
  Confidence: {        
    type: Number,
    required: true
  },
  recommendations: {        
    diet: {
      type: [String],
      default: []
    },
    exercise: {
      type: [String],
      default: []
    },
    tests: {
      type: [String],
      default: []
    },
    medicine: {
      type: [String],
      default: []
    },
    specialist: {
      type: String,
      default: ""
    }
  }
}, {timestamps:true});

const kidneyPrediction = mongoose.model("kidneyPrediction", kidneySchema);

/**
 * @description exporting all models
 */
export {generalPrediction,heartDiseasePrediction,diabetesPrediction,kidneyPrediction};