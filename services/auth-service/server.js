import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend domain
    credentials: true, // Enable cookies in CORS
  }));
  app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);

// Sync Database
try {
  await sequelize.sync({ force: false });
  console.log(" Database synced");
} catch (error) {
  console.error("Database sync error:", error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
