const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Hello from home");
});

//login
app.get("/login", (req, res) => {
  res.send("Hello from login");
});
//register
app.get("/reg", (req, res) => {
  res.send("Hello from register");
});
//404
app.get("*", (req, res) => {
  res.send("err0r 404");
});
app.listen(8000, () => {
  console.log("connected on 8000");
});
