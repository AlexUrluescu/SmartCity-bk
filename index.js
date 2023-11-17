import express from "express";
import mongoose from "mongoose";
import Senzor from "./models/senzorModel.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_URL_DB = process.env.CONNECTION_URL_DB;

const connect = async () => {
  try {
    await mongoose.connect(CONNECTION_URL_DB);
    console.log("Conected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.get("/lastdata", async (req, res) => {
  try {
    const mostRecentValue = await Senzor.find().sort({ _id: -1 }).limit(1);
    res.json(mostRecentValue[0]);
  } catch (error) {
    console.log(error);
  }
});

const deleteAll = async () => {
  try {
    await Senzor.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/sendData", async (req, res) => {
  const temperature = req.query.temperature;
  const humidity = req.query.humidity;
  const date = new Date();
  const emission = req.query.emission;

  console.log(temperature);
  console.log(humidity);
  console.log(emission);

  try {
    const dataReceived = {
      temperature: temperature,
      humidity: humidity,
      date: date,
      emission: emission,
    };

    const newSenzor = await Senzor.create(dataReceived);

    res.status(200).json(newSenzor);
  } catch (error) {
    console.log(error);
  }
});

connect();
// deleteAll();
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
