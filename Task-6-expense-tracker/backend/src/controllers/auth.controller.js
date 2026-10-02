const config = require("../config/config");
const userModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const minimumPasswordLength = 6;

// register controller
async function registerController(req, res) {
  const { name, email, password } = req.body;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  if (!password || password.length < minimumPasswordLength) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  //check of email exist
  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist) {
    return res.status(409).json({
      message: "Email already exist",
    });
  }

  //Password hashing
  const hash = await bcrypt.hash(password, 10);

  //creating user
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  //create jwt token
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  //set token in cookies
  res.cookie("jwt_token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  //success response
  res.status(201).json({
    message: "User registered successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
}

//login controller
async function loginController(req, res) {
  const { email, password } = req.body;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  if (!password || password.length < minimumPasswordLength) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  //check email exist
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // check password
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "invalid password",
    });
  }

  // create new token
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  //set token to cookies
  res.cookie("jwt_token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  //success response
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
}

//GetMe controller
async function getMeController(req, res) {
  //get token from cookies
  const token = req.cookies.jwt_token;

  // if token not present
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized| invalid token",
    });
  }

  //handling decoding
  let decoded = null;
  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user!",
    });
  }

  // find user by id
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      message: "user not found!",
    });
  }

  //success response
  res.status(200).json({
    message: "user fetched",
    user: {
      name: user.name,
      email: user.email,
    },
  });
}

//logout controller
async function logoutController(req, res) {
  res.clearCookie("jwt_token");
  return res.status(200).json({
    message: "User logged out successfully...",
  });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
