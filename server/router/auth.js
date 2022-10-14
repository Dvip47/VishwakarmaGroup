const express = require("express");
const router = express.Router();
require("../DB/connection");
const Product = require("../model/productSchema");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authentication");

// add Product
router.post("/addProduct", async (req, res) => {
  const { id, category, src, title, description, Price, discount } = req.body;
  if (!id || !title || !Price || !description) {
    return res.status(442).json({ error: "Check all required feild" });
  }
  try {
    const productExist = await Product.findOne({ description: description });
    if (productExist) {
      return res.status(442).json({ error: "Product already exist" });
    }
    const product = new Product({
      id,
      category,
      src,
      title,
      description,
      Price,
      discount,
    });
    let x = await product.save();

    res.status(201).json({ message: "Product Added Successfulll" });
  } catch (err) {
    console.log(err);
  }
});

// registation

router.post("/registation", async (req, res) => {
  const { name, mobile, email, pass, cpass } = req.body;
  console.log(req.body);
  if (!name || !email || !mobile || !pass || !cpass) {
    return res.status(422).json({ error: " Check all require feild" });
  }
  try {
    const userExist = await User.findOne({ mobile: mobile });
    if (userExist) {
      console.log("user already exist");
    }
    const user = new User({
      name,
      email,
      mobile,
      pass,
      cpass,
    });
    let x = await user.save();
    console.log(x);
    res.status(201).json({ message: "registation successfully" });
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/signin", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const password = req.body;
    if (!email || !pass) {
      return res.status(400).json({ error: "Fill All Feilds" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      if (pass !== userLogin.pass) {
        res.status(400).json({ message: "Incalid Password" });
      }
      res.json({ message: "user Sign in successfully" });
    } else {
      res.status(400).json({ message: "Invalid email" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
