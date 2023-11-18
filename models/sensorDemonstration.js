import mongoose from "mongoose";

// Define schema
const Schema = mongoose.Schema;

const sensorDemonstrationSchema = new Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  emission: {
    type: Number,
    required: true,
  },
  zone: {
    type: Number,
    required: true,
  },
});

const SensorDemo = mongoose.model("SensorDemo", sensorDemonstrationSchema);

export default SensorDemo;
