import mongoose from "mongoose";

// Define schema
const Schema = mongoose.Schema;

const senzorSchema = new Schema({
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
});

const Senzor = mongoose.model("Senzor", senzorSchema);

export default Senzor;
