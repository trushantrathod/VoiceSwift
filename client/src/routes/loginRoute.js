const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /login-user - User login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, login successful
      const token = jwt.sign({ email: user.email }, "your-secret-key", {
        expiresIn: "1h",
      });
      return res.json({ status: "ok", data: token });
    } else {
      // Passwords don't match, login failed
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // Handle database or other errors
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
