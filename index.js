import express from "express";
import mongoose from "mongoose";
import Sensor from "./models/sensorModel.js";
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
    const mostRecentValue = await Sensor.find().sort({ _id: -1 }).limit(1);
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
  const zone = req.query.zone;

  try {
    const dataReceived = {
      temperature: temperature,
      humidity: humidity,
      date: date,
      emission: emission,
      zone: zone,
    };

    console.log(dataReceived);

    const newSenzor = await Sensor.create(dataReceived);

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
