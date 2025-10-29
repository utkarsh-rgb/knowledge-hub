require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/articles", articlesRoutes);

// optional: admin-only route to list users
const User = require("./models/User");
const { auth, permit } = require("./middleware/auth");
app.get("/admin/users", auth, permit("admin"), async (req,res)=> {
  const users = await User.find().select("-password");
  res.json(users);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
