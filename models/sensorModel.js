import mongoose from "mongoose";

// Define schema
const Schema = mongoose.Schema;

const sensorSchema = new Schema({
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

const Sensor = mongoose.model("Sensor", sensorSchema);

export default Sensor;
