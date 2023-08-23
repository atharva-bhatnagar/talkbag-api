const express = require("express");
const cors = require("cors");
const app = express();
require("./config/db");
require("dotenv").config();
// const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



const allowedOrigins = [
  "http://localhost:5173",
  
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // Allow including cookies in cross-origin requests
    exposedHeaders: ["Access-Control-Allow-Credentials"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/config.env" });
}

const path = require("path");
// const userRouter = require("./routers/userRouter");

// app.use("/upc/api/v1", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  );
}

module.exports = app;
