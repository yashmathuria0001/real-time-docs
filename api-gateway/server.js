import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Proxy to Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);

//Proxy to Document Service
app.use(
  "/api/documents",
  createProxyMiddleware({
    target: process.env.DOCUMENT_SERVICE_URL,
    changeOrigin: true,
  })
);

// Proxy to Collaboration Service
app.use(
  "/api/collaboration",
  createProxyMiddleware({
    target: process.env.COLLAB_SERVICE_URL,
    changeOrigin: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
