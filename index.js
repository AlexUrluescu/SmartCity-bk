import express from "express";
import mongoose from "mongoose";
import Sensor from "./models/sensorModel.js";
import SensorDemo from "./models/sensorDemonstration.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);

dotenv.config();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT;
const CONNECTION_URL_DB = process.env.CONNECTION_URL_DB;

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.emit("hello", "world");
});

// const currentDate = new Date();

// // Step 2: Use the toISOString method to get the date in ISO format
// const isoDate = currentDate.toISOString();

// // Step 3: Extract the date part from the ISO string
// const yyyyMMdd = isoDate.slice(0, 10);

// console.log(yyyyMMdd);

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

app.post("/insertdata", async (req, res) => {
  try {
    for (let i = 0; i < 31; i++) {
      const date = new Date();
      const isoDate = date.toISOString();
      const currentDate = isoDate.slice(0, 10);
      const dataReceived = {
        temperature: Math.floor(Math.random() * 51),
        humidity: Math.floor(Math.random() * (99 - 30 + 1)) + 30,
        date: currentDate,
        emission: Math.floor(Math.random() * 51),
        zone: Math.floor(Math.random() * 9) + 1,
      };

      const newSenzor = await SensorDemo.create(dataReceived);

      console.log(newSenzor);
    }

    res.status(200).json(newSenzor);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getdata", async (req, res) => {
  try {
    const sensorDemos = await SensorDemo.find({});

    console.log(sensorDemos);
    res.json(sensorDemos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getweek", async (req, res) => {
  try {
    const sensorDemos = await SensorDemo.find().sort({ date: -1 }).limit(7);

    // console.log(sensorDemos);
    res.json(sensorDemos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getday", async (req, res) => {
  try {
    const date = new Date();

    const isoDate = date.toISOString();
    const currentDate = isoDate.slice(0, 10);
    const sensorDemos = await Sensor.find().sort({ date: -1 }).limit(10);

    // console.log(sensorDemos);
    res.json(sensorDemos);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/sendData", async (req, res) => {
  const temperature = req.query.temperature;
  const humidity = req.query.humidity;
  const date = new Date();
  const emission = req.query.emission;
  const zone = req.query.zone;

  if (temperature > 40) {
    io.emit("alert", { message: `The temperature is ${temperature}` });
  }

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
    io.emit("updateData", { data: newSenzor });

    res.status(200).json(newSenzor);
  } catch (error) {
    console.log(error);
  }
});

connect();
// deleteAll();
server.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
