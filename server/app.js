const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// MongoDB connection URL
const mongoUrl = "mongodb+srv://bigfade99:qNgJgcsBrVQK2y3m@cluster0.oo3ruej.mongodb.net/myapp?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to database");
}).catch((e) => console.log(e));

// Define User schema
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

// Define Report schema
const reportSchema = new mongoose.Schema({
  title: String,
  content: String,
  sentiment: String,
});

// Model userSchema as User
const User = mongoose.model("User", userSchema);

// Model reportSchema as Report
const Report = mongoose.model("Report", reportSchema);

// Register a new user
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.json({ error: "User Exists" });

    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ fname, lname, email, password: encryptedPassword });
    
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

// Login user and issue JWT token
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const token = jwt.sign({ userId: user._id }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ", { expiresIn: "1h" });
    res.json({ status: "ok", token });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Save report for the authenticated user
app.post("/api/reports", async (req, res) => {
  const { title, content, sentiment } = req.body;
  
  try {
    const newReport = await Report.create({ title, content, sentiment });
    res.status(201).json({ status: "ok", report: newReport });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Fetch all reports
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json({ status: "ok", reports });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// Handle other routes...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
