const userModel = require("../../database/models/users.model");
const bcrypt = require("bcrypt");
const { issueTokenUser } = require("./auth.service");

const registerUser = async (req, res) => {
  const { name, email, password, ...rest } = req.body;

  // Validate required fields
  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Email, Name and password are required",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    const user = await userModel.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        message: "user with this email already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      name,
      email,
      password: hashedPassword,
      ...rest,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = issueTokenUser(userData);

    res.status(200).json({
      message: "Login successful",
      user: userData,
      token: token
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
